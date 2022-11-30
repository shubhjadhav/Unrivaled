import Pkg

Pkg.add("Distances")
Pkg.add("PDFIO")
Pkg.add("TextAnalysis")
Pkg.add("Docx")
Pkg.add("Languages")
Pkg.add("Flux")

using Distances
using PDFIO
using TextAnalysis 
using Docx
using Languages
using Flux
using Base64
using Base.Threads

function  base64topdf(resume, jd)

  open("resume.pdf", "w") do file
    write(file, base64decode(split(resume, ',')[2]))
  end

  open("jd.pdf", "w") do file
      write(file, base64decode(split(jd, ',')[2]))
  end
end

const fpath = ""



#   Extract Text from PDF
#   –––––––––––––––––––––––

"""
​```
    getPDFText(src, out) -> Dict 
​```
- src - Input PDF file path from where text is to be extracted
- out - Output TXT file path where the output will be written
return - A dictionary containing metadata of the document
"""
function getPDFText(src, out)
    # handle that can be used for subsequence operations on the document.
    doc = pdDocOpen(src)
    s = ""
    
    # Metadata extracted from the PDF document. 
    # This value is retained and returned as the return from the function. 
    docinfo = pdDocGetInfo(doc) 
    open(out, "w") do io
    
        # Returns number of pages in the document       
        npage = pdDocGetPageCount(doc)

        for i=1:npage
            s1 = ""
        
            # handle to the specific page given the number index. 
            page = pdDocGetPage(doc, i)
            
            # Extract text from the page and write it to the output file.
            pdPageExtractText(io, page)
        end
    end
    # Close the document handle. 
    # The doc handle should not be used after this call
    pdDocClose(doc)

    f = open(out)    
    s_resume = read(f, String)
    
    return s_resume
end

"""
​```
get_path(fpath, user_name, file_name) -> String 
​```
- fpath - Hardcoded File Path
- user_name - Client's username ; Resume and JD are stored in a folder with this name
- file_name - filename of either Resume/ Job Description
path - Returns Concatenated file path

"""
function get_path(fpath, user_name, file_name)
    path = fpath * "\\" * user_name * "\\" * file_name
    return file_name
end

#   Text processing pipeline
#   ––––––––––––––––––––––––––

# using TextAnalysis
# using Languages


"""
​```
preprocess_string(text) -> StringDocument
​```
- text - input text to be preprocessed
- flags - list of preprocessing steps
str_doc - returns preprocessed StringDocument

"""

function preprocess_string(text)   

    str_doc = StringDocument(text)
    STOPWORDS = stopwords(Languages.English())
    remove_case!(str_doc)
    prepare!(str_doc, strip_punctuation
        | strip_articles
        | strip_pronouns
        | strip_numbers
        | strip_non_letters)
    remove_words!(str_doc, STOPWORDS)

    return str_doc
end


"""
​```
get_word_length(text) -> Int
​```
- text - input text to find length
Returns number of words in the given text

"""
function get_word_length(text)
    return length(tokenize(text))

end

"""
​```
keyword_match(pp_resume, pp_jd)-> Int, Vector{}
​```
- pp_resume - Preprocessed StringDocument of Resumes
- pp_jd - Preprocessed StringDocument of Job Description
Returns 
    count - Count of matched keywords between resume and JD
    tokens_list - List of Matched Keywords

"""
function keyword_match(pp_resume, pp_jd)

    resume_tokens = tokenize(pp_resume.text)
    jd_tokens = tokenize(pp_jd.text)
    tokens = ""

    count = 0
    for token in resume_tokens
        if token in jd_tokens
            count += 1
            tokens = tokens * token
        end
    end
    tokens_list = split(tokens, " ")
    return count, tokens_list
end

#   Flux
#   ======

function load_embeddings(embedding_file)
    local LL, indexed_words, index
    indexed_words = Vector{String}()
    LL = Vector{Vector{Float32}}()
    open(embedding_file) do f
    
        index = 1
        for line in eachline(f)
            xs = split(line)
            word = xs[1]
            push!(indexed_words, word)
            push!(LL, parse.(Float32, xs[2:end]))
            index += 1
        end
    end
    return reduce(hcat, LL), indexed_words
end


embeddings, vocab = load_embeddings("../Julia_NLP_Engine/Embeddings/glove.6B.50d.txt")



#Function to return the index of the word in the embedding (returns 0 if the word is not found)
function vec_idx(s)
    i=findfirst(x -> x==s, vocab)
    i==nothing ? i=0 : i 
end

function get_corpus(r_text, jd_text)
    docs = []
    Arr = [r_text.text, jd_text.text]
    for i in 1:length(Arr)
        push!(docs, StringDocument(Arr[i]))
    end
    crps = Corpus(docs)
    update_lexicon!(crps)
    return crps
end

function get_embeddings(crps)
    update_lexicon!(crps)
    doc_term_matrix = DocumentTermMatrix(crps)
    word_dict = doc_term_matrix.column_indices

    tk_idx(s) = haskey(word_dict, s) ? i = word_dict[s] : i = 0

    function pad_corpus(c, pad_size)
        M = []
        for doc in 1:length(c)
            tks = tokens(c[doc])
            if length(tks) >= pad_size
                tk_indexes = [tk_idx(w) for w in tks[1:pad_size]]
            end
            if length(tks) < pad_size
                tk_indexes = zeros(Int64, pad_size - length(tks))
                tk_indexes = vcat(tk_indexes, [tk_idx(w) for w in tks])
            end
            doc == 1 ? M = tk_indexes' : M = vcat(M, tk_indexes')
        end
        return M
    end

    pad_size = 4
    padded_docs = pad_corpus(crps, pad_size)
    x = padded_docs'

    embed_size, max_features = size(embeddings)
    println("Loaded embeddings, each word is represented by a vector with $embed_size features. The vocab size is $max_features")

    N = size(padded_docs,1)
    vocab_size = length(doc_term_matrix.terms)+1
    max_features = 50

    print(vocab_size)

    wvec(s) = embeddings[:, vec_idx(s)]
    embedding_matrix=Flux.glorot_normal(max_features, vocab_size)
    
    @threads for term in doc_term_matrix.terms
        if vec_idx(term)!=0 
            embedding_matrix[:,word_dict[term]+1]=wvec(term)
        end
    end 

    m = Chain(x -> embedding_matrix * Flux.onehotbatch(reshape(x, pad_size*N), 0:vocab_size-1),
                x -> reshape(x, max_features, pad_size, N),
                x -> sum(x, dims=2),
                x -> reshape(x, max_features, N),
                Dense(max_features, 1, σ)
    )

    doc_vector = m[1:4](x)

    return doc_vector
end

"""
​```
process_file(userid, resume_name, jd_name) -> Int, Vector{}
​```
- pp_resume - Preprocessed StringDocument of Resumes
- pp_jd - Preprocessed StringDocument of Job Description
Returns 
    checklist

"""
function process_file(resume_b64, jd_b64)
       
    base64topdf(resume_b64, jd_b64)
    checklist = Dict()    

    userid = ""
    resume_name = "resume.pdf"
    jd_name = "jd.pdf"

    # // Get file extensions
    resume_ext = split(resume_name, '.')[2]
    jd_ext = split(jd_name, '.')[2]

    # // Get file paths
    resume_path = get_path(fpath, userid, resume_name)
    jd_path = get_path(fpath, userid, jd_name)
    println(resume_path, jd_path)

    # // Extrcat text from input files 
    if resume_ext == "pdf"
        resume_out_path = get_path(fpath, userid, "out_" * resume_name)
        s_resume = getPDFText(resume_path, resume_out_path)
        println("PDF Processed and stored at $resume_out_path")

    else
        document = Docx.open(resume_path)
        s_resume = Docx.read(document, String)
    end


    if jd_ext == "pdf"
        jd_out_path = get_path(fpath, userid, "out_" * jd_name)
        s_jd = getPDFText(jd_path, jd_out_path)
        println("PDF Processed and stored at $jd_out_path")

    else
        document1 = Docx.open(jd_path)
        s_jd = Docx.read(document1, String)
    end

    # // Preprocess Strings
    checklist["Words in Resume"] = get_word_length(s_resume)
    pp_resume = preprocess_string(s_resume)
    println("Preprocessed Resume $pp_resume")
    checklist["Keywords in resume"] = get_word_length(pp_resume.text)

    checklist["Words in JD"] = get_word_length(s_jd)
    pp_jd = preprocess_string(s_jd)
    println("Preprocessed JD $pp_jd")
    checklist["Keywords in JD"] = get_word_length(pp_jd.text)
    keyword_info = keyword_match(pp_resume, pp_jd)

    checklist["Matched Keywords"] = keyword_info[1]
    checklist["Keyword Match Rate"] = checklist["Matched Keywords"] / checklist["Keywords in JD"]


    crps = get_corpus(pp_resume, pp_jd)

    embed_vector = get_embeddings(crps)

    println(
        corr_dist(embed_vector[:,1],embed_vector[:,2]), "\n",
        cosine_dist(embed_vector[:,1],embed_vector[:,2])
    )

    checklist["Similarity Score"] = cosine_dist(embed_vector[:,1],embed_vector[:,2])
    
    freq_dict = lexicon(crps)
    new_freq_list = []

    for (key,value) in freq_dict
        if value > 1
            push!(new_freq_list, Dict{Any, Any}("text" => key, "value" => value))
        end
    end

    checklist["Frequency_Dict"] = new_freq_list 

    return checklist 
end
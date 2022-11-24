using Languages, TextAnalysis, Flux, PyPlot, Statistics

#Display Flux Version
import Pkg;

Arr = ["well done",
    "good work",
    "great effort",
    "nice work",
    "excellent",
    "weak",
    "poor effort",
    "not good",
    "poor work",
    "could have done better"]

# positve or negative sentiment to each 'document' string
y = [true true true true true false false false false false]

docs = []
for i in 1:length(Arr)
    push!(docs, StringDocument(Arr[i]))
end
crps = Corpus(docs)
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
data = [(x, y)]

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

embeddings, vocab = load_embeddings("glove.6B.50d.txt")
embed_size, max_features = size(embeddings)
println("Loaded embeddings, each word is represented by a vector with $embed_size features. The vocab size is $max_features")

#Function to return the index of the word in the embedding (returns 0 if the word is not found)
function vec_idx(s)
    i=findfirst(x -> x==s, vocab)
    i==nothing ? i=0 : i 
end


wvec(s) = embeddings[:, vec_idx(s)]
wvec("done")

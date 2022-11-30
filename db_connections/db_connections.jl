using Mongoc
using JSON
# connecting to the server
client = Mongoc.Client("mongodb://localhost:27017")

# accessing to the database
unrivaled = client["unrivaled"]

# accessing the collection in the unrivaled database
user_details = unrivaled["user_details"]
resumes = unrivaled["resumes"]
job_descriptions = unrivaled["job_descriptions"]
scores = unrivaled["scores"]


# This funciton is used to show the contents of a given database
function show_db(db_name)
    doc_list = Mongoc.find(db_name)
    println("The db ",string(db_name), " is: ")
    for each in doc_list
        println(each)
    end
    println()
end


# Create DB Entry
# This input is a dictionary from the UI but I am using a sample here.
cur_dict = Dict(
    "Name" => "Hello", 
    "password"=>"1234",
    "resume_name" => "Hello_resume", 
    "jd" => "receptionist"
)


# This funciton upload files to database
function file_upload(dictionary)
    vector = [Mongoc.BSON(dictionary)]
    if dictionary["docType"] === "resume"
        append!(resumes, vector)
    else
        append!(job_descriptions, vector)
    end

    println("The document is successfully uploaded.")
end


# This funciton takes signup info and adds it to the user_details collection
function user_detail_upload(dictionary)
    vector = [Mongoc.BSON(dictionary)]
    append!(user_details, vector)
    println("The user's details are successfully uploaded.")
end
# user_detail_upload(cur_dict)


# This funciton takes file upload info and adds it to the resumes collection
function resume_upload(dictionary)
    vector = [Mongoc.BSON(dictionary)]
    append!(resumes, vector)
    println("The user's resume is successfully uploaded.")
end


# This funciton takes job description and adds it to the job_descriptions collection
function job_description_upload(dictionary)
    vector = [Mongoc.BSON(dictionary)]
    append!(job_descriptions, vector)
    println("The user's job description is successfully uploaded.")
end


# This funciton takes signup info and adds it to the user_details collection
function score_upload(dictionary)
    vector = [Mongoc.BSON(dictionary)]
    append!(scores, vector)
    println("The user's score is successfully uploaded.")
end


# Read from DB collections
# This function is used to return a path for a given username and resume/job_description
function get_path(username, filetype)
    if filetype === "resume"
        doc_BSON = Mongoc.find(resumes, Mongoc.BSON("""{"Name": "$username"}"""))
    elseif filetype === "job_description"
        doc_BSON = Mongoc.find(job_descriptions, Mongoc.BSON("""{"Name": "$username"}"""))
    end
    for each in doc_BSON
        cur_dict = Mongoc.as_dict(each)
        println("The path for the user is successfully retrived")
        return cur_dict["Name"] *"/"*cur_dict["filename"]*"/"*cur_dict["resume_name"]
    end
end


# This function is used to check if a user is a registered user or not and returns a boolean value
function is_registered_user(dictionary)
    login_user_name = dictionary["Name"]
    login_password = dictionary["password"]
    println("The user name is $login_user_name and the password is $login_password")
    user_db_data_BSON = Mongoc.find(user_details, Mongoc.BSON("""{"Name": "$login_user_name"}"""))
    registered = false

    for each in user_db_data_BSON
        user_db_data_dict = Mongoc.as_dict(each)
        if user_db_data_dict["Name"] == login_user_name && user_db_data_dict["password"] == login_password
            registered = true
        end
    end

    result = Dict() 
    result["registered"] = registered
    result["username"] = dictionary["Name"]

    if registered
        println("Yes, the user is registered.")
    else
        println("Please register to proceed.")
    end

    return result
end


# This funciton returns all the resumes in the resume collection
function get_all_resumes()
    resume_list = Mongoc.find(resumes,options=Mongoc.BSON("""{ "projection":{"file":false }}"""))
    a = []
    for res in resume_list
        push!(a, Mongoc.as_dict(res))
    end
    return a
end

# This funciton returns all the jds in the job_description collection
function get_all_jds()
    jd_list = Mongoc.find(job_descriptions,options=Mongoc.BSON("""{ "projection":{"file":false }}"""))
    a = []
    for jd in jd_list
        push!(a, Mongoc.as_dict(jd))
    end
    return a
end

# This function returns one resume using username and resume name 
# as a key to search in the resume collection
function get_one_resume(dictionary)
    username = dictionary["username"]
    resume_name = dictionary["resume"]
    cur_file = Mongoc.find(resumes, Mongoc.BSON("""{"username": "$username", "name": "$resume_name"}"""))
    final_resume = []
    for each in cur_file
        push!(final_resume, each)
    end
    return final_resume
end


# This function returns all the resumes of a specific user using username 
# as a key to search in the resume collection
function get_user_resume(dictionary)
    username = dictionary["username"]
    cur_file = Mongoc.find(resumes, Mongoc.BSON("""{"username": "$username"}"""))
    final_resumes = []
    for each in cur_file
        push!(final_resumes, each)
    end
    return final_resumes
end


# This function returns one job description using username and jd as a key 
# to search in the job_descriptions collection
function get_one_jd(dictionary)
    username = dictionary["username"]
    jd_name = dictionary["jd"]
    cur_file = Mongoc.find(job_descriptions, Mongoc.BSON("""{"username": "$username", "name": "$jd_name"}"""))
    final_jd = []
    for each in cur_file
        push!(final_jd, each)
    end
    return final_jd
end


# This function returns all the jd's of a specific user using username and 
# jd name as a key to search in the job_descriptions collection
function get_user_jd(dictionary)
    username = dictionary["username"]
    cur_file = Mongoc.find(job_descriptions, Mongoc.BSON("""{"username": "$username"}"""))
    final_jd = []
    for each in cur_file
        push!(final_jd, each)
    end
    return final_jd
end

is_registered_user(Dict("Name"=> "Hello", "password" => "1234"))
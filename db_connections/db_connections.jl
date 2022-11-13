import Mongoc
import JSON
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
cur_dict = Dict("Name" => "Hello", "password"=>"1234","resume_name" => "Hello_resume", "jd" => "receptionist")

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
    if registered
        println("Yes, the user is registered.")
    else
        println("Please register to proceed.")
    end
    return registered
end
is_registered_user(Dict("Name"=> "Hello", "password" => "1234"))
show_db(user_details)
show_db(resumes)
show_db(job_descriptions)
show_db(scores)

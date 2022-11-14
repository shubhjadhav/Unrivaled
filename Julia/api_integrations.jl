using Oxygen

include("json_checker.jl")

@get "/greet" function()
    "hello world!"
end

@get "/saluer" () -> begin
    "Bonjour le monde!"
end

@get "/subtract/{a}/{b}" subtract

@post "/resume" single_resume

@post "/uploadFile" upload_file

@post "/saveUserDeatils" save_user_details

@post "/analyze" analytics

@get "/getAllResumes" get_all_resumes_from_db

# start the web server
serve()
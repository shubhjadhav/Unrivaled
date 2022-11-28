using Oxygen

include("json_checker.jl")

@post "/uploadFile" upload_file

@post "/saveUserDeatils" save_user_details

@post "/analyze" analytics

@get "/getAllResumes" get_all_resumes_from_db

@get "/getAllJDs" get_all_jds_from_db

# start the web server
serve()
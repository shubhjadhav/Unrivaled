using Oxygen

include("api_request_handlers.jl")

@post "/uploadFile" upload_file

@post "/saveUserDeatils" save_user_details

@post "/analyze" analytics

@post "/login" login

@get "/getAllResumes" get_all_resumes_from_db

@get "/getAllJDs" get_all_jds_from_db

# start the web server
serve()
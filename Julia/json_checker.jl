using JSON

include("../db_connections/db_connections.jl")

function subtract(req, a::Float64, b::Float64)
  return a - b
end

function single_resume(req)
    # deserialize JSON from the request body into an Animal struct
    # resume = json(req, data)
    # serialize struct back into JSON automatically (because we used StructTypes)
    str = String(req.body)
    jobj = JSON.Parser.parse(str)
    print(jobj)
    return true
end

function upload_file(req)
  str = String(req.body)
  file_upload(JSON.parse(str))
  return true
end

function get_all_resumes_from_db()
  return get_all_resumes()
end


function save_user_details(req)
  str = String(req.body)
  user_details = JSON.parse(str)
  user_detail_upload(user_details)
  return true
end

function analytics(req)
  str = String(req.body)
  data = JSON.parse(str)
  println(data)
  return true
end
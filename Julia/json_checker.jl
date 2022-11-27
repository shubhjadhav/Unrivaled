using JSON
include("../db_connections/db_connections.jl")

function upload_file(req)
  str = String(req.body)
  file_upload(JSON.parse(str))
  return true
end

function get_all_resumes_from_db()
  return get_all_resumes()
end

function get_all_jds_from_db()
  # return get_all_jds()
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
  return true
end
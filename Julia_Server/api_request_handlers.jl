using JSON
include("../DB_Connections/db_connections.jl")
include("../Julia_NLP_Engine/nlp_pipeline.jl")

function upload_file(req)
  str = String(req.body)
  file_upload(JSON.parse(str))
  return true
end

function login(req)
  str = String(req.body)
  return is_registered_user(JSON.parse(str))
end


function get_all_resumes_from_db()
  return get_all_resumes()
end

function get_all_jds_from_db()
  return get_all_jds()
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

  resume = get_one_resume(data)
  jd = get_one_jd(data)

  results =  process_file(resume[1]["file"], jd[1]["file"])

  return results
end
using JSON

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
  # deserialize JSON from the request body into an Animal struct
  # resume = json(req, data)
  # serialize struct back into JSON automatically (because we used StructTypes)
  str = String(req.body)
  print(str)
  return true
end
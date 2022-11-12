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

# start the web server
serve()
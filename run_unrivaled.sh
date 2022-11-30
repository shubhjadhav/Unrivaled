#!/bin/bas

echo "Unrivaled is unwrapping and getting ready to be executed"

osascript -e 'tell app "Terminal"
    do script "brew services start mongodb-community@5.0"
end tell'

osascript -e 'tell app "Terminal"
    do script "julia ./Unrivaled/Julia_Server/server.jl"
end tell'

osascript -e 'tell app "Terminal"
    do script "cd ./Unrivaled/UI && npm i && npm start"
end tell'
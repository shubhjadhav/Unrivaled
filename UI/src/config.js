//----------------------------------------------------------------------------------
// Author: Shubham Jadhav
// Description: Config file containing variables to be used across application
//----------------------------------------------------------------------------------

const basePath = "http://localhost:8080/"
const dummyPath = "https://countriesnow.space/api/v0.1/countries/currency"

module.exports = {
  name: "Unrivaled",
  port: 3100,
  secretKey: 'awesome',
  urls: {
    basePath: basePath,
    dummyPath: dummyPath
  }
}
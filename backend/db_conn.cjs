const mysql = require("mysql");
const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Ayush#2004",
    database : "ebook"
})


module.exports = conn
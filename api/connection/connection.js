const env = require("dotenv").config();
const mysql = require("mysql");
const con = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12644974',
    password: 'jdinq6WQVe',
    database: 'sql12644974',
});

if (con) {
    console.log("Mysql success");
} else {
    console.log("Mysql Failed");
}
module.exports = con;
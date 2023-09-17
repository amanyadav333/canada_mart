const env = require("dotenv").config();
const mysql = require("mysql");
const con = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12647014',
    password: '1qPS49WHkd',
    database: 'sql12647014',
});

if (con) {
    console.log("Mysql success");
} else {
    console.log("Mysql Failed");
}
module.exports = con;
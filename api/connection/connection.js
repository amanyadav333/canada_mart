const env = require("dotenv").config();
const mysql = require("mysql");
const con = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12643272',
    password: 'F3Belsp4ia',
    database: 'sql12643272',
});

if (con) {
    console.log("Mysql success");
} else {
    console.log("Mysql Failed");
}
module.exports = con;
const env = require("dotenv").config();
const mysql = require("mysql");
const con = mysql.createPool({
    connectionLimit : 2000,
    host: 'canmart.ctj2n9izy3ec.ap-south-1.rds.amazonaws.com',
    user: 'canmart',
    password: 'canmart1234',
    database: 'canmart',
});

if (con) {
    console.log("Mysql success");
} else {
    console.log("Mysql Failed");
}
module.exports = con;
require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect((err) => {

    if (err) {
        console.log("Error conectando a MySQL:", err);
        return;
    }

    console.log("MySQL conectado");
});

module.exports = connection;
const mysql = require('mysql2');


const db = mysql.createConnection({
    host : 'localhost',
    user : process.env.DATABASE_USER, 
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
});

db.connect((err) => {
    if(err) throw err;
    else console.log("mysql connected ... ");
    console.log(process.env.DATABASE_NAME);
});

module.exports = {
    db: db
}
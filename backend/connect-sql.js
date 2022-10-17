const mysql = require('mysql');

// mysql connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root', 
    password : '',
    database : 'dunder'
})

db.connect((err) => {
    if(err) throw err;
    else console.log("mysql connected ... ");
});


module.exports = {
    db: db
}
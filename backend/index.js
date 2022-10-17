const ejs = require('ejs');
const express = require('express');
const cors = require('cors');
const {db} = require('./connect-sql.js');

// Express app 
const PORT = 3000;
const app = express();

app.listen(PORT, ()=>{
    console.log("server started at ", PORT);
})

// CORS
app.use(cors('localhost'));


// console.log(db, app);
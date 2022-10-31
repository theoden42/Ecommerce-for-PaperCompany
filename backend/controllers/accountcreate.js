const { db } = require('../connectsql.js');

exports.createCustomer = (req, res, next) =>{
    const username = req.body.usernamefield;
    const fullname = req.body.fullnamefield;
    const pass = req.body.passwordfield;
    const cpass = req.body.confirmpasswordfield;
    const mobileno = req.body.mobilenumberfield;
    const city = req.body.cityfield;
    const companyname = req.body.companynamefield;
    const shipaddress = req.body.shippingaddressfield;

    if(!username || !fullname || !pass || !cpass || !mobileno || !city || !companyname || !shipaddress){
        return res.status(400).render('customersignup', { message: "Incomplete details"});
    } 
    if(pass != cpass){
        return res.status(400).render('customersignup', { message: "Passwords Do not match"});
    }
    let query1 = 'INSERT INTO customers VALUES(?, ?, ?);'
    let query2 = 'INSERT INTO accounts VALUES(?, ?, ?, ?, ?);'

    db.beginTransaction((err) => {
        if(err) throw err;

        db.query(query1, [username, companyname, shipaddress], (err, result) =>{
            if(err) db.rollback((err) => {throw err;});
        })
        db.query(query2, [username, pass, fullname, mobileno, city], (err, result) =>{
            if(err) db.rollback((err) => {throw err;});
        });

        db.commit((err) => {
            if(err){
                db.rollback(() => {
                    throw err;
                });
            }
        });
        res.send("done!");
    });
}

// TODO: needs to be tested
exports.createEmployee = (req, res, next) =>{
    const username = req.body.usernamefield;
    const fullname = req.body.fullnamefield;
    const pass = req.body.passwordfield;
    const cpass = req.body.confirmpasswordfield;
    const mobileno = req.body.mobilenofield;
    const city = req.body.cityfield;
    const ismgr = req.body.ismgr;
    const branch = req.body.branch;
    if(!username || !fullname || !pass || !cpass || !mobileno || !city || !ismgr || !branch){
        return res.status(400).render('employeesignup', { message: "Incomplete details"});
    }
    if(pass !== cpass){
        return res.status(400).render('employeesignup', { message: "passwords do not match"});
    }
    let query1 = 'INSERT INTO employees VALUES(?, ?, ?)'
    let query2 = 'INSERT INTO accounts VALUES(?, ?, ?, ?, ?)';
    db.beginTransaction((err) => {
        if(err) throw err;

        db.query(query1, [username, ismgr, branc], (err, results) => {
            if(err) db.rollback((err) => {throw err;});
        });
        db.query(query2, [username, pass, mobileno, city], (err, results) => {
            if(err) db.rollback((err) => {throw err;});
        });

        db.commit((err) => {
            if(err){
                db.rollback((err) => {
                    throw err;
                });
            }
        });
        res.send("done!");
    });
}
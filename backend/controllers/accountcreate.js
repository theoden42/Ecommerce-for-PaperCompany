const { db } = require('../connectsql.js');

exports.createCustomer = async(req, res, next) =>{
    const username = await req.body.usernamefield;
    const fullname = await req.body.fullnamefield;
    const pass = await req.body.passwordfield;
    const cpass = await req.body.confirmpasswordfield;
    const mobileno = await req.body.mobilenumberfield;
    const city = await req.body.cityfield;
    const companyname = await req.body.companynamefield;
    const shipaddress = await req.body.shippingaddressfield;

    if(!username || !fullname || !pass || !cpass || !mobileno || !city || !companyname || !shipaddress){
        return res.status(400).render('customersignup', { message: "Incomplete details"});
    } 
    if(pass != cpass){
        return res.status(400).render('customersignup', { message: "Passwords Do not match"});
    }

    let query1 = 'INSERT INTO accounts VALUES(?, ?, ?, ?, ?);'
    let query2 = 'INSERT INTO customers(cust_id, company, shipping_address) VALUES(?, ?, ?);'

    try{
        db.beginTransaction(err => {
            if(err){ throw err; }
            db.query(query1, [username, pass, fullname, mobileno, city], (err, results) => {
                if(err){
                    return db.rollback(() => {throw err;});
                }
                db.query(query2, [username, companyname, shipaddress], (err, results) =>{
                    if(err){
                        return db.rollback(() => {throw err;});
                    }
                    return db.commit( err => {
                        return db.rollback(() => {throw err;});
                    });
                });
            });
        });
    } catch(err){
        console.log('error during transaction - customer creation: ' + err);
        return res.status.render('500serverissue');
    }
    return res.status(200).redirect('/');
}

// TODO: needs to be tested
exports.createEmployee = (req, res, next) =>{
    const username = req.body.usernamefield;
    const fullname = req.body.fullnamefield;
    const pass = req.body.passwordfield;
    const cpass = req.body.confirmpasswordfield;
    const mobileno = req.body.mobilenofield;
    const city = req.body.cityfield;
    const ismgr = req.body.ismanagerfield;
    const branch = req.body.branchnamefield;

    console.log(username, fullname, pass, cpass, mobileno, city, ismgr, branch);
    if(!username || !fullname || !pass || !cpass || !mobileno || !city || !ismgr || !branch){
        return res.status(400).render('employeesignup', { message: "Incomplete details"});
    }
    if(pass !== cpass){
        return res.status(400).render('employeesignup', { message: "passwords do not match"});
    }
    let query1 ='INSERT INTO accounts VALUES(?, ?, ?, ?, ?)';
    let query2 = 'INSERT INTO employees("emp_id", "is_mgr", "branch") VALUES(?, ?, ?)';
    db.beginTransaction((err) => {
        if(err) throw err;

        db.query(query1, [username, pass, mobileno, city,], (err, results) => {
            if(err){
                db.rollback((err) => {throw err;});
                console.log('error is here: query1');
            }
        }); 
        db.query(query2, [username, ismgr, branch], (err, results) => {
            if(err){
                db.rollback((err) => {throw err;});
                console.log('error is here: query2');
            } 
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
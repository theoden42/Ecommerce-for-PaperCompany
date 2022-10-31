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

    console.log(username, fullname, pass, cpass, mobileno, city, companyname, shipaddress);

    if(!username || !fullname || !pass || !cpass || !mobileno || !city || !companyname || !shipaddress){
        console.log('empty details');
        return res.status(400).render('customersignup', { message: "Incomplete details"});
    } 
    if(pass != cpass){
        console.log('passwords do not match');
        return res.status(400).render('customersignup', { message: "Passwords Do not match"});
    }
    let query1 = 'INSERT INTO customers VALUES(?, ?, ?);'
    let query2 = 'INSERT INTO accounts VALUES(?, ?, ?, ?, ?);'

    db.beginTransaction(async(err) => {
        if(err){
            throw err;
        }
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

exports.createEmployee = (req, res, next) =>{
    
}
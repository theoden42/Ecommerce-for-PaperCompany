const { db } = require('../connectsql.js');

exports.createCustomer = async(req, res, next) =>{
    const username =  req.body.usernamefield;
    const fullname =  req.body.fullnamefield;
    const pass = req.body.passwordfield;
    const cpass =  req.body.confirmpasswordfield;
    const mobileno =  req.body.mobilenumberfield;
    const city =  req.body.cityfield;
    const companyname = req.body.companynamefield;
    const shipaddress = req.body.shippingaddressfield;


    if(!username || !fullname || !pass || !cpass || !mobileno || !city || !companyname || !shipaddress){
        req.session.message = 'Incomplete Details';
        return res.status(400).redirect('dashboard/cust');
    } 
    if(pass != cpass){
        req.session.message = 'Passwords do not match';
        return res.status(400).redirect('dashboard/cust');
    }

    let query1 = 'INSERT INTO accounts VALUES(?, ?, ?, ?, ?);'
    let query2 = 'INSERT INTO customers (cust_id, company, shipping_address) VALUES(?, ?, ?);'

    db.beginTransaction(err => {
        if(err){ 
            db.rollback(() => { console.log(err); });
            return res.status(500).render('500serverissue');
        }   
         db.query(query1, [username, pass, fullname, mobileno, city], (err, results) => {
            if(err){
                db.rollback(() => { console.log(err) });
                return res.status(500).render('500serverissue');
            }
            db.query(query2, [username, companyname, shipaddress], (err, results) =>{
                if(err){
                     db.rollback(() => { console.log});
                     return res.status(500).render('500serverissue');
                }
                return db.commit( err => {
                    if(err){
                        db.rollback(() => { console.log(err)});
                        return res.status(500).render('500serverissue');
                    }
                    return res.status(200).redirect('dashboard/cust');
                });
            });
        });
    });

}


exports.createEmployee = (req, res, next) =>{
    const username = req.body.usernamefield;
    const fullname = req.body.fullnamefield;
    const pass = req.body.passwordfield;
    const cpass = req.body.confirmpasswordfield;
    const mobileno = req.body.mobilenumberfield;
    const city = req.body.cityfield;
    const ismgr = req.body.ismanagerfield;
    const branch = req.body.branchnamefield;

    if(!username || !fullname || !pass || !cpass || !mobileno || !city || !ismgr || !branch){
        req.session.message = 'Incomplete Details';
        return res.status(400).redirect('dashboard/emp');
    }
    if(pass !== cpass){
        req.session.message = 'Password do not match';
        return res.status(400).redirect('dashboard/emp');
    }

    let query1 ='INSERT INTO accounts VALUES(?, ?, ?, ?, ?)';
    let query2 = 'INSERT INTO employees(emp_id, is_mgr, branch ) VALUES(?, ?, ?)';

    db.beginTransaction(err => {
        if(err){ 
            db.rollback(() => { console.log(err); });
            return res.status(500).render('500serverissue');
        }   
         db.query(query1, [username, pass, fullname, mobileno, city], (err, results) => {
            if(err){
                db.rollback(() => { console.log(err) });
                return res.status(500).render('500serverissue');
            }
            db.query(query2, [username, ismgr, branch], (err, results) =>{
                if(err){
                     db.rollback(() => { console.log});
                     return res.status(500).render('500serverissue');
                }
                return db.commit( err => {
                    if(err){
                        db.rollback(() => { console.log(err)});
                        return res.status(500).render('500serverissue');
                    }
                    return res.status(200).redirect('dashboard/emp');
                });
            });
        });
    });

}
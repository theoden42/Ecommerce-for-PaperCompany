const { db }  = require('../connectsql.js');

exports.authcustomer = async (req, res, next) => {
    const username = req.body.usernamefield;
    const password = req.body.passwordfield;

    if(!username || !password){
        return res.status(400).render('customerlogin', { message: 'Incomplete Credentials'});
    }
    
    db.query('SELECT user_id, pass, cust_id FROM accounts, customers WHERE user_id=? and cust_id=?', [username, username], (error, results)=>{
        if(error){
            console.log(error);
            return res.status(500).render('customerlogin', { message : 'There was an issue, please try again'});
        }
        if(!results || results.length === 0){
            return res.status(400).render('customerlogin', { message: 'Invalid Credentials'});
        }
        if(results[0].pass !== password){
            return res.status(400).render('customerlogin', { message: 'Invalid Credentials'});
        }
        else{
            const usr = {"type": "customer", "cust_id": username};
            console.log(usr);
            req.session.user = usr;
            req.session.save();
            return res.status(200).redirect('/');
        }
    });
};

exports.authemployee = (req, res, next) => {
    const username = req.body.usernamefield;
    const password = req.body.passwordfield;

    if(!username || !password){
        return res.status(400).render('employeelogin', { message: 'Incomplete Credentials'});
    }
    
    db.query('SELECT user_id, pass, is_mgr ,emp_id FROM accounts, employees WHERE user_id=? and emp_id=?', [username, username], (error, results)=>{
        if(error){
            console.log(error);
            return res.status(500).render('employeelogin', { message : 'There was an issue, please try again'});
        }
        if(!results || results.length === 0){
            return res.status(400).render('employeelogin', { message: 'Invalid Credentials'});
        }
        if(results[0].pass !== password){
            return res.status(400).render('employeelogin', { message: 'Invalid Credentials'});
        }
        else{
            const usr = {"type": "employee", "cust_id": username};
            if(results[0].is_mgr == 1){
                usr.type = "manager";
            }
            console.log(usr);
            req.session.user = usr;
            req.session.save();
            return res.status(200).redirect('/');
        }
    });
};



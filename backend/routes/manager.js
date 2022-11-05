const express = require('express');
const router = express.Router();
const privilege = require('../controllers/privilegemanager');
const creator = require('../controllers/accountcreate');
const { db }  = require('../connectsql.js');

router.get('/customercreate', privilege.isManager, (req, res, next) =>{
    res.render('customersignup');
});
router.get('/employeecreate', privilege.isManager, (req, res, next) =>{
    res.render('employeesignup');
});

router.post('/customercreate', privilege.isManager, creator.createCustomer);
router.post('/employeecreate', privilege.isManager, creator.createEmployee);

router.get('/dashboard', privilege.isManager, (req, res, next) => {
    res.status(200).redirect('/manager/dashboard/cust');
});

router.get('/dashboard/emp', privilege.isManager, (req, res, next) => {
    db.query('SELECT name, branch, sales, target from accounts JOIN employees ON emp_id = user_id WHERE is_mgr = 0 ORDER BY sales/target;', (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).render('managerdashboardemp', {type : req.session.user.type, empPerformance : results});
    });
});

router.get('/dashboard/cust', privilege.isManager, (req, res, next) => {
    // console.log('reached cust dash');
    db.query('SELECT name, mob_no, company, city FROM accounts JOIN customers ON user_id = cust_id;', (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).render('managerdashboardcust', {type : req.session.user.type, custDetails : results});
    });
    // res.status(200).render('managerdashboardcust', {type : req.session.user.type, custDetails : results});
});

router.get('/logout', privilege.isManager, (req, res, next) =>{
    res.status(200).redirect('/logout');
});


module.exports = router;


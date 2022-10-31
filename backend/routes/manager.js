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
router.post('/customercreate', privilege.isManager, creator.createEmployee);

router.get('/dashboard', privilege.isManager, (req, res, next) => {
    db.query('SELECT name, branch, sales, target from accounts JOIN employees ON emp_id = user_id WHERE is_mgr = 0 ORDER BY sales/target;', (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).render('managerdashboard', {type : req.session.user.type, empPerformance : results});
    }) 
});

router.get('/logout', privilege.isManager, (req, res, next) =>{
    res.status(200).redirect('/logout');
});


module.exports = router;


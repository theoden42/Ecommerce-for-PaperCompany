const express = require('express');
const router = express.Router();
const privilege = require('../controllers/privilegemanager');
const creator = require('../controllers/accountcreate');

router.get('/customercreate', privilege.isManager, (req, res, next) =>{
    res.render('customersignup');
});
router.get('/employeecreate', privilege.isManager, (req, res, next) =>{
    res.render('employeesignup');
});
router.post('/customercreate', privilege.isManager, creator.createCustomer);
router.post('/customercreate', privilege.isManager, creator.createEmployee);


module.exports = router;


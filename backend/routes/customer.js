const express = require('express');
const router = express.Router();
const privilege = require('../controllers/privilegemanager');

router.get('/logout', privilege.isCustomer, (req, res, next) =>{
    res.status(200).redirect('/logout');
});

router.get('/dashboard', privilege.isCustomer, (req, res, next) => {
    res.status(200).render('customerdashboard', {type : req.session.user.type});
});

module.exports = router;

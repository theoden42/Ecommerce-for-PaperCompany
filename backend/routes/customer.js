const express = require('express');
const router = express.Router();
const privilege = require('../controllers/privilegemanager');
const { db }  = require('../connectsql.js');

router.get('/dashboard', privilege.isCustomer, (req, res, next) => {
    db.query('SELECT order_id, prod_id, qty, status FROM `orders` WHERE cust_id = ? ORDER BY status ASC, order_id DESC;', [req.session.user.user_id] , (error, results)=>{
        if(error) throw error;

        res.status(200).render('customerdashboard', {type : req.session.user.type, custOrders : results});
    });
    
});

router.get('/orderproduct', privilege.isCustomer, (req, res, next) => {
    db.query('SELECT * FROM products;', (error, results)=>{
        if(error) throw error;
        res.status(200).render('orderproducts', { products : results });
    });
});

module.exports = router;

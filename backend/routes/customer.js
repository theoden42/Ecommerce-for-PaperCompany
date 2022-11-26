const express = require('express');
const router = express.Router();
const privilege = require('../controllers/privilegemanager');
const ordermanager = require('../controllers/ordermanager');
const { db }  = require('../connectsql.js');

router.get('/dashboard', privilege.isCustomer, (req, res, next) => {
    db.query('SELECT order_id, name, qty, status FROM `orders` JOIN `products` ON orders.prod_id = products.prod_id WHERE cust_id = ? ORDER BY status ASC, order_id DESC;', [req.session.user.user_id] , (error, results)=>{
        if(error) throw error;
        db.query('SELECT cust_id, name, mob_no, city, shipping_address FROM `accounts` JOIN customers ON customers.cust_id = accounts.user_id WHERE cust_id = ?;', [req.session.user.user_id], (errors, results1) => {
            if(errors) throw errors;
            res.status(200).render('customerdashboard', {type : req.session.user.type, custOrders : results, custDetails : results1});

        });
    });
    
});

router.get('/orderproduct', privilege.isCustomer, (req, res, next) => {
    db.query('SELECT * FROM products;', (error, results)=>{
        if(error) throw error;
        res.status(200).render('orderproducts', { products : results });
    });
});

router.post('/markrecieved', privilege.isCustomer, (req, res, next) => {
    let custid = req.session.user.user_id;
    let orderid = req.body.orderid;
    db.query('UPDATE orders SET status = "recieved" WHERE order_id = ? AND cust_id = ?;',[orderid, custid], (errors, results) => {
        if(errors) throw errors;
        else{
            res.status(200).redirect('/customer/dashboard');
        }
    });
});

router.get('/createorder', privilege.isCustomer, ordermanager.handleOrder);

module.exports = router;

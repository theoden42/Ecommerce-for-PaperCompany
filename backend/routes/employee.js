const express = require('express');

const router = express.Router();
const privilege = require('../controllers/privilegemanager');
const employeefunctions = require('../controllers/employeefunctions');
const { db } = require('../connectsql.js');


router.get('/dashboard', privilege.isEmployee, (req, res, next) => {
    let unassigned, assignedToEmp, empDetails;
    const userid = req.session.user.user_id;
    // console.log(req.session.user.user_id + " accessing emp dashboard");
    db.query('SELECT * FROM `orders` WHERE `assigned` IS NULL;', (error, result1) => {
        if (error) throw error;
        else {
            db.query('SELECT order_id, products.name AS prod_name, qty, accounts.name AS cust_name, customers.company, customers.shipping_address, accounts.mob_no, orders.status FROM `orders` JOIN `accounts` ON orders.cust_id = accounts.user_id JOIN `products` ON orders.prod_id = products.prod_id JOIN `customers` ON customers.cust_id = orders.cust_id WHERE `assigned` = ?;', 
            [userid], (error, result2) => {
                if (error) throw error;
                else {
                    db.query('SELECT emp_id, name, mob_no, branch, target, sales, is_mgr FROM `accounts` JOIN `employees` ON accounts.user_id = employees.emp_id WHERE user_id = ?;'
                        , [userid], (error, result3) => {
                            if (error) throw error;
                            else {
                                res.status(200).render('employeedashboard',
                                    { 
                                        type: req.session.user.type, 
                                        unassigned: result1, 
                                        assignedToEmp: result2, 
                                        empDetails: result3 
                                    });
                            }
                        });
                }
            });
        }
    });
    
});

router.post('/assignself', privilege.isRegEmployee, (req, res, next) => {
    const order_id = req.body.orderid;
    const user_id = req.session.user.user_id;
    db.query('SELECT assigned FROM orders WHERE order_id = ?', [order_id], (error, results) => {
        if(error) throw error;
        else if(results[0].assigned != null) res.status(400).render('400forbidden');
        else{
            //order was unassigned
            db.query('UPDATE orders SET assigned = ? WHERE order_id = ?;', [user_id, order_id], (errors, results) => {
                if(errors) throw errors;
                else res.status(200).redirect('/employee/dashboard');
            });
        }
    });
});

router.post('/updatestatus', privilege.isRegEmployee, (req, res, next) => {
    const order_id = req.body.orderid;
    const newStatus = req.body.newstatus;
    const user_id = req.session.user.user_id;
    db.query('SELECT * FROM orders WHERE order_id = ?', [order_id], (error, results) => {
        if(error) throw error;
        else if(results[0].assigned != user_id) res.status(400).render('400forbidden');
        else{
            db.query('UPDATE orders SET status = ? WHERE order_id = ?;', [newStatus, order_id], (errors, results) => {
                if(errors) throw errors;
                else{
                    res.status(200).redirect('/employee/dashboard');
                } 
            });
        }
    });
});
module.exports = router;

const express = require('express');
const router = express.Router();
const privilege = require('../controllers/privilegemanager');
const { db } = require('../connectsql.js');


router.get('/dashboard', privilege.isEmployee, (req, res, next) => {
    let unassigned, assignedToEmp, empDetails;
    const userid = req.session.user.user_id;
    console.log(req.session.user.user_id + "accessing emp dashboard");
    db.query('SELECT * FROM `orders` WHERE `assigned` IS NULL;', (error, result1) => {
        if (error) throw error;
        else {
            db.query('SELECT * FROM `orders` WHERE `assigned` = ?;', [userid], (error, result2) => {
                if (error) throw error;
                else {
                    db.query('SELECT emp_id, name, mob_no, branch, target, sales, is_mgr FROM `accounts` JOIN `employees` ON accounts.user_id = employees.emp_id WHERE user_id = ?;'
                        , [userid], (error, result3) => {
                            if (error) throw error;
                            else {
                                console.log(result3);
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

module.exports = router;

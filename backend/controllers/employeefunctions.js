const { db } = require('../connectsql.js');

exports.assignself = (req, res, next) => {
    const order_id = req.query.order_id;
    const user_id = req.session.user.user_id;
    db.query('SELECT status FROM orders WHERE order_id = ?', order_id, (error, results) => {
        console.log('reached');
        if(error) return res.status(500).render('500serverissue');
        else{
            console.log(results[0].status);
            return res.status(200).redirect('dashboard');
        }
    });
}

// exports.updateSales = ()
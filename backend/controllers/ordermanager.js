const { db } = require('../connectsql.js');

exports.handleOrder = (req, res, next) =>{

    const prodid = req.query.prodid;
    const qty = req.query.qty;
    const query = 'SELECT stock FROM products WHERE prod_id = ?'

    console.log(prodid, qty);
    if(!qty || !prodid){
        return res.render('404error');
    }

    db.query(query, [prodid], (error, results) => {
        if(error) return res.status(500).render('500serverissue');

        if(results[0].stock < qty){
            return res.status(400).render('400forbidden');
        }
        else{
           db.beginTransaction(err => {
                if(err){
                    db.rollback(() => {
                        console.log(err);
                        return res.render('500serverissue');
                    });
                }
                const query1 = 'INSERT INTO orders (cust_id, prod_id, qty, status) VALUES(?, ?, ?, "pending");';
                const query2 = 'UPDATE products SET stock=stock-? WHERE prod_id=?;';

                db.query(query1, [req.session.user.user_id, prodid, qty], (err, results) => {
                    if(err){
                        db.rollback(()=>{
                            console.log(err);
                            return res.render('500serverissue');
                        });
                    }
                    db.query(query2, [qty, prodid], (err, results) => {
                        if(err){
                            db.rollback(()=>{
                                console.log(err);
                                return res.render('500serverissue');
                            });
                        }
                        return db.commit(err => {
                            if(err){
                                db.rollback(()=>{
                                    console.log(err);
                                    return res.render('500serverissue');
                                });
                            }
                            return res.status(200).redirect('dashboard');
                        });
                    });
                });
           }); 
        }
    });
}

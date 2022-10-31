
exports.isCustomer = (req, res, next) => {
    if(!req.session.user){
        return res.status(400).redirect('/customerlogin');
    }
    let user =  req.session.user;
    if(user.type !== 'customer'){
        return res.status(400).render('400forbidden');
    } else{
        return next();
    }
}

exports.isEmployee = (req, res, next) => {
    if(!req.session.user){
        return res.status(400).redirect('/employeelogin');
    }
    let user = req.session.user;
    if(user.type !== 'employee' && user.type !== 'manager'){
        return res.status(400).render('400forbidden');
    } else{
        return next();
    }
}

exports.isManager = (req, res, next) => {
    if(!req.session.user){
        return res.status(400).redirect('/employeelogin');
        //!todo : can give alert as to why redirected, better as UX
    }
    let user = req.session.user;
    if(user.type !== 'manager'){
        return res.status(400).render('400forbidden');
    } else{
        return next();
    }
}




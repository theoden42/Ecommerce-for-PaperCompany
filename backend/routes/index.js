const express = require('express');
const router = express.Router();
const authenticator = require('../controllers/authenticators');
const privilegemanagers = require('../controllers/privilegemanager');

router.get('/', (req, res, next) => {
  let logged = false;
  let userType = "";
  if(req.session.user){
    logged = true;
    userType = req.session.user.type;
  }
  res.render('landingpage', {logged : logged, type : userType});
});
router.get('/customerlogin', (req, res, nex) =>{
  res.render('customerlogin', {message: ''});
});

router.get('/employeelogin', (req, res, next)=>{
  res.render('employeelogin', {message: ''});
});
router.get('/logout', (req, res, next) => {
  if(req.session.user){
    req.session.destroy();
    res.status(200).redirect('/');
  }else{
    res.status(400).redirect('/');
  }
});

router.post('/customerlogin', authenticator.authcustomer);
router.post('/employeelogin', authenticator.authemployee);
router.get('/orderproduct', privilegemanagers.isCustomer, (req, res, next) => {
  res.send('orderproduct');
});

router.all('*', (req, res, next)=>{
  res.render('404error');
});

module.exports = router;

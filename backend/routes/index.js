const express = require('express');
const router = express.Router();
const authenticator = require('../controllers/authenticators');

router.get('/', (req, res, next) => {
  let logged = false;
  if(req.session.user){
    logged = true;
  }
  res.render('landingpage', {logged});
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



router.all('*', (req, res, next)=>{
  res.render('404error');
});

module.exports = router;

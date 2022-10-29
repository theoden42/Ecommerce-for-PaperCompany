const express = require('express');
const router = express.Router();
const authenticator = require('../controllers/authenticators');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landingpage');
});

router.get('/customerlogin', (req, res, nex) =>{
  res.render('customerlogin', {message: ''});
});

router.get('/employeelogin', (req, res, next)=>{
  res.render('employeelogin', {message: ''});
});

router.post('/customerlogin', authenticator.authcustomer);

router.post('/employeelogin', authenticator.authemployee);



router.all('*', (req, res, next)=>{
  res.render('404error');
})

module.exports = router;

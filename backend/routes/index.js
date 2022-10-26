const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landingpage', { title: 'Express' });
});

router.all('*', (req, res, next)=>{
  res.render('404error');
})

module.exports = router;

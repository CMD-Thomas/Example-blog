'use strict'
const express = require('express');
const router 	= express.Router();

router.get('/', function(req, res){
	req.session.destroy(); 
	res.render('about', {title: 'About'});
});


module.exports = router;
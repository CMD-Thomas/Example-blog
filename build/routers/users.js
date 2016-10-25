'use strict'
const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');

//LOGIN routers
router.get('/login', function(req, res){
  let title = 'title';
	res.render('login', {req : req, title: title});
});

router.post('/login', function(req, res, next){
  let username = req.body.username;
  let password = req.body.password;

  req.getConnection(function(err, connection){
    if(err){ next(err); }
    connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, records){
      if(err){ next(err) }
      if(records.length > 0){
        bcrypt.compare(password, records[0].password, function(err, result){
          if(result === false){

            res.json({ success: false, message: 'Authentication failed. Password wrong.' });
          } else {

            var user = 
              {
                  name : records[0].username,
                  id   : records[0].id
              };
            req.session.user    = user;
            console.log(req.session.user)

            //res.send(req.session);
            let title = 'title';
            res.redirect('/admin')
          }
        })
      }
    })
  })
});



module.exports = router;
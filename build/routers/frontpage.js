'use strict'
const express = require('express');
const router  = express.Router();

router.get('/', function(req, res){
  req.getConnection(function(err, connection){
    if(err){ return next(err); }
    connection.query('SELECT id, post, title, created_by, users_id, DATE(created_at) AS created_at, category FROM posts ORDER BY created_at DESC', function(err, posts){
      let title = 'Home';
      res.render('blog', {posts: posts, title: title});
    })
  });
});

module.exports = router;
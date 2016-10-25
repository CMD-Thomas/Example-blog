'use strict'
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
  let title = 'Categories';
  res.render('home', {req: req, title: title});
});

//categories/cats
router.get('/:id', function(req, res){
    req.getConnection(function(err, connection){
        if(err){ return next(err); }
        connection.query('SELECT id, post, title, created_by, users_id, DATE(created_at) AS created_at, category FROM posts WHERE posts.category = ?', [req.params.id], function(err, posts){
          if(posts.length > 0){ 
            // How to make an API shortcut style
            let title = req.params.id;

            // let data = {
            //   posts: posts,
            //   req: req,
            //   title: title
            // };
            // res.send(data.posts)
            // Make{title} first letter uppercase
            res.render('category', {posts: posts, req: req, title: title});

          } else {
            let title = 'No posts... yet!'
            res.render('noPost', {req: req, title: title})
          }
        });
    });
});

router.get('/:category/:title/:id', function(req, res){
    req.getConnection(function(err, connection){
        if(err){ return next(err); }
        connection.query('SELECT * FROM posts WHERE posts.id = ?', [req.params.id], function(err, posts){
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
          if(posts.length > 0){
            res.render('singlePost', {posts: posts, req: req, fullUrl : fullUrl, title: posts[0].title});
          } else {
            res.send('error');
          }
        });
    });
});

module.exports = router;
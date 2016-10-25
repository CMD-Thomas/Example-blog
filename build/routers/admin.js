'use strict'
var express = require('express');
var router  = express.Router();
var bcrypt  = require('bcrypt');


//ROUTER admin
router.get('/', function(req, res){
	if(req.session.user){
  		req.getConnection(function(err, connection){
	    	if(err){ return next(err); }
		    connection.query('SELECT * FROM posts', function(err, posts){
		    	if(err){ return next(err); }

				  res.render('adminpanel', {req: req, posts: posts, title: 'Adminpanel'});
			  });
	    });
  } else {
   	res.send('log eerst in');
  }
});

router.get('/update/:id', function(req, res){
  console.log(req.params.id);
    req.getConnection(function(err, connection){
        if(err){ return next(err); }
        connection.query('SELECT * FROM posts WHERE posts.id = ?', [req.params.id], function(err, posts){

          res.render('updatePost', {posts: posts, req: req, title: 'Update post'});
        });
    });
});

router.get('/add', function(req, res){
	if(req.session.user){
        res.render('admin', {req: req, username: req.session.user.name, title: 'Add a post'});
      }
      else {
      	res.send('log eerst in');
      }
});

//POST admin which is basically adding a post 
router.post('/add', function(req, res){
	req.getConnection(function(err, connection){
    if(err){ next(err); }

     	connection.query('INSERT INTO posts (post, title, created_by, users_id, category) VALUES (?) ',[[req.body.post, req.body.post_title, req.session.user.name, req.session.user.id, req.body.category]],  function(err, result) {
 

        if (err){ 
          console.log("error " + err);
        } 
        else {
        res.redirect('/admin');
        }
      });
    // }
 	});
});

//update post router
router.post('/update/:id', function(req, res){
	console.log(req.body.post);
	req.getConnection(function(err, connection){
    if(err){ next(err); }
    console.log(req.body)
   	connection.query('UPDATE posts SET post=?, title=?, created_by=? WHERE id =?',[req.body.post, req.body.post_title, 'Tmrobotix', req.params.id],  function(err, result) {
      console.log(result);
  	 res.redirect('/admin');
    });
 	});
});

router.get('/delete/:id', function(req, res){
	req.getConnection(function(err, connection){
    console.log(req.params.id)
		var postId = req.params.id;
	if(err){ next(err); }
	   	connection.query('DELETE FROM posts WHERE posts.id=?', [postId], function(err, result) {
			 res.redirect('/admin');
	    });
 	});
});

module.exports = router;
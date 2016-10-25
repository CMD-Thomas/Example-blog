# Node Blog

###How to use
1. This is example code which won't work because there is no database. The database is in mysql a live example can be found [here](https://thomasmachielsen.me/)
2. Obviously this is not a finished project, it's a work in progress.
3. 

###Info
On the back end there's a Node web app powered with Express. In the current situation I call a res.render inside the route. Then a view gets called, this view uses EJS to render stuff.

###To-do
- Make it an api, rather then render in a route, send data in a route and have a seperate client-side web app on top off the api
- Get rid of EJS replace it with Handlebars. When I started this project I used EJS because I liked how it resembles JavaScript, however it is quite verbose and I now believe HBS is superior. 
- Restructure the project, some of the routes should become more routes, I am also considering getting a folder for one route and add the route, ejs and styl in one folder.
- Get rid off bootstrap
- The adminpanel needs a lot of attention
- Use ES6 all over the board, though to this being a side-project it never got the love it deserves so there is a combination of ES5 and ES6, which is ugly.
- Add https:// the certificate is expired. 
- Get rid of the lorem pixel images. 
- Obviously, add real posts.


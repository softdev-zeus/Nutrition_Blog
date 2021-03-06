//DEPENDENCIES
  var express = require('express');
  var app = express ();
  var bodyParser = require('body-parser');
  var blogController = require('./controllers/blogPost'); // whenver access a file that is an npm module, have to have ./
  var categoriesController = require('./controllers/categories.js');
  var methodOverride = require('method-override');
  var mongoose = require('mongoose'); // connects to server
  var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';

//PORT
  var port = process.env.PORT || 3000; // used to launch application in browser

//DATABASE
    mongoose.connect(mongoDBURI); // 1) this constantly checks for a connection to our server 2) this port is used to connect to the computer's hard drive and the mongo database 3) we created a blog db
    var db = mongoose.connect; // saving mongo connection to a variable

    mongoose.connection.once('open', function(){
      console.log('connected to mongo');
    });

//MIDDLEWARE
    app.use(express.static("public"));
    app.use(methodOverride('_method'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//CONTROLLER MIDDLEWARE
    app.use('/blog', blogController); // must be after other middleware or req.body will return undefined
                                      // inside of our blogPost.js the root route now becomes /blog
    app.use('/categories', categoriesController);

//ROOT ROUTE
    app.get('/', function(req, res){
      res.redirect('/blog');
    });

//LISTENER
    app.listen(port, function(){
      console.log('listening...' + port);
    });

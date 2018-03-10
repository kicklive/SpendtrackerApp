 var express = require('express');
 // var stylus=require('stylus');
 // var logger=require('morgan');
 // var bodyParser=require('body-parser');
 var mongoose = require('mongoose');
 //environment variable to tell with in dev or prod mode
 //assigning a default value into NODE_ENV if it hasn't been assigned already
 var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

 //create express application
 var app = express();
 var config = require('./server/config/config')[env];
 require('./server/config/express')(app, config);
 require('./server/config/mongoose')(config);
 require('./server/config/routes')(app, config);

 //mongoose.connect('mongodb://localhost/Spendtracker2018');
 // if (env==='development'){

 //     mongoose.connect('mongodb://localhost/Spendtracker2018');
 // }
 // else{
 //     mongoose.connect('mongodb://kicklive:spendtracker@ds117858.mlab.com:17858/spendtracker2018');
 // }
 //console.log(process.env.NODE_ENV);
 // mongoose.connect(config.db);
 // var db=mongoose.connection;
 // db.on('error',console.error.bind(console,'connection error...'));
 // db.once('open',function callback(){
 //     console.log('Spendtracker2018 db open');
 // });

 //create a schema for Mongoose, even though mongo is schemaless, mongoose uses schemas
 //this a test schema being created

 //next, have to create the model based on the schema
 //var Message=mongoose.model('Message',messageSchema);



 // //server side route for the partials files
 // //* will return a under the partials directory
 // app.get('/partials/*',function(req, res){
 //     res.render('../../public/app/'+req.params[0]); //first element will be what matches up with the * in the path
 // })

 // //have to set up static routing to our public directory for stylus config

 // //catchall route
 // app.get('*',function(req,res){
 //     //testing mongo, add mongoMessage
 //     res.render('index');
 // });


 //if port not set, set it to 3333. Using Heroku, port 80 is used. So
 //get the environment port, or any port you set (local, unknown port)
 //var port=process.env.PORT ||3333;
 app.listen(config.port);
 console.log('Server started. Listning on port ' + config.port);
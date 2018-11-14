 var express = require('express');
 require('extend-error');
 // var stylus=require('stylus');
 // var logger=require('morgan');
 // var bodyParser=require('body-parser');
 //var mongoose = require('mongoose');
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
 app.use(clientErrorHandler);

 //  if (app.get('env') === 'development') {
 //      console.log("expressXX==>");
 //      app.use(function(err, req, res, next) {
 //          console.log("expressXX==>" + err);
 //          res.status(err.status || 500);
 //          res.render('error', {
 //              message: err.message,
 //              error: err
 //          });
 //      });

 //  }

 //  // production error handler
 //  // no stacktraces leaked to user
 //  app.use(function(err, req, res, next) {
 //      console.log("expressBB==>" + err);
 //      res.status(err.status || 500);
 //      res.render('error', {
 //          message: err.message,
 //          error: {}
 //      });
 //  });

 function clientErrorHandler(err, req, res, next) {
     console.log("expressmsg==>" + err.code);
     if (req.xhr) {
         res.status(500).send({ error: 'Something failed!' });
     } else {
         switch (err.code) {
             case 11000:
                 res.status(400).send({ status: 400, message: 'Item already exists', code: 11000, type: 'internal' });
                 break;
             default:
                 res.status(500).send({ status: 500, message: err.message, code: err.code, type: 'internal' });
         }
     }
 }


 //  require('extend-error');

 // var ClientError = Error.extend('ClientError', 400);
 // var HttpNotFound = ClientError.extend('HttpNotFound', 404);

 // var myHttpNotFound = new HttpNotFound('my error message');

 // // Output: true
 // console.log(myHttpNotFound instanceof HttpNotFound);

 // // Output: true
 // console.log(myHttpNotFound instanceof ClientError);

 // // Output:
 // // { [HttpNotFound: my error message]
 // //   name: 'HttpNotFound',
 // //   code: 404,
 // //   message: 'my error message' }
 // console.log(myHttpNotFound);
 app.listen(config.port);
 console.log('Server started. Listning on port ' + config.port);
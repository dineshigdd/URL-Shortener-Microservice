'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);
app.use(cors());

var Schema = mongoose.Schema;
var URLSchema = new Schema({
  originalURL :{ type: String,required:true},
  shortURL: { type: String}
})

var URL = mongoose.model('URL',URLSchema);

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 

app.post("/api/shorturl/new", function (req, res) {  
  var shorturl = 0;
  shorturl = Math.floor(Math.random() * 10000);
    
  
  res.json({
            original_url: req.body.url,
            short_url: shorturl
           });
  
  // var createURL = (done)=> {      
  var url = new URL( { originalURL: req.body.url,shortURL:shorturl });
  
  url.save().then( displayMsg => {
            
            res.send("Url is saved");
        
  });  
  //};    

//  var findUrl = function(originalUrl, done) {  
//       URLSchema.find({ original_url: originalUrl }, (err,data)=>{
//             (err)? done(err):done(null,data)    

//       });
   
//       res.redirect('/').send({originalUrl:originalUrl});
      
//     };
  
});

app.get("/api/shorturl/new",(req,res)=> {
   res.send("hello");
//   var findUrl = function(originalUrl, done) {  
//       URLSchema.find({ original_url: originalUrl }, (err,data)=>{
//             (err)? done(err):done(null,data)    

//       });

//       res.send({originalUrl:originalUrl});
//     };
})



app.listen(port, function () {
  console.log('Node.js listening ...');
});
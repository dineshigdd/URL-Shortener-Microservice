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
  var url = new URL( { originalURL: req.body.url,shortURL:shorturl });
 
  URL.find({ originalURL: req.body.url}, (err, data)=>{
              
                if(err){
                   
                  return (err);
                }else{
                      if(!data.length){
                        
                        url.save((err,data)=>{
                                if(err){
                                   return console.log(err);
                                }else{
                                 res.json({
                                        original_url: req.body.url,
                                        short_url: shorturl
                                         })
                                 
                                }
                                
                            });
                      }else if( data[0].originalURL === req.body.url ){
                        res.send("<html><body><a href='https://'" + __dirname +"'">Dinesh</a></body></html>");
                   
                        }
                }
              });
                  
});





app.listen(port, function () {
  console.log('Node.js listening ...');
});
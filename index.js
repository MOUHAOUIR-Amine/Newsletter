const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false});
app.use(bodyParser.urlencoded({extended:true}));
app.use('/assets',express.static('assets'));
app.get('/',function(req,res) {
  res.sendFile(__dirname+'/index.html');
});
app.post('/',urlencodedParser,function(req,res) {
  var fname=req.body.first;
  var lname=req.body.last;
  var email=req.body.email;
  var data={
    members:[
      {email_address:email,
        status:"subscribed",
        merge_fields:{
          "FNAME":fname,
          "LNAME":lname,
        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);

  var options={
    url:"https://us8.api.mailchimp.com/3.0/lists/8bed1c9ffc",
    method:"POST",
    headers:{
      "Authorization":"amine1 32b2ede0b29df8937fe85baa07aa7ba3-us8",
    },
    body:jsonData,
  }
  request(options,function(error,response,body) {
    if(error){
      res.sendFile(__dirname+'/error.html');
    }if(response.statusCode==200){
      res.sendFile(__dirname+'/success.html');}
      else {
        res.sendFile(__dirname+'/error.html');

    }
  })
});
app.post('/error',function(req,res) {
  res.sendFile(__dirname+'/index.html');
})

app.listen(process.env.PORT || 3000);
console.log("port 3000");

// e177f8ebe9be52d1016112228b53bfaa-us8

// list // ID 8bed1c9ffc

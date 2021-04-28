const dotenv = require('dotenv'); 
const fs = require('fs'); 
const express = require('express'); 
const bodyParser = require('body-parser');
const db = require('./models/db.js'); 

const app = express(); 
app.use(bodyParser.urlencoded({extended:false})); 

dotenv.config(); 
port = process.env.PORT; 
hostname = process.env.HOSTNAME; 

app.get('/', function(req,res){
    fs.readFile('./index.html', function(err, data){
        res.setHeader('Content-Type', 'text/html');
        if (err){
            res.status = 404; 
            res.write('404 not found');
        } else{
            res.status = 200; 
            res.write(data); 
        }
    }); 
}); 

// app.get('/register', function(req, res){
//     var un = req.query.username;
//     var pw = req.query.password; 
//     res.end('You have been registered, ' + un + ' pw: ' + pw); 
// }); 


app.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password; 

    var person ={
        username: username, 
        password: password
    }

    db.insertOne('users', person); 
    res.send('You have been registered, ' + username + ' pw: ' + password); 
}); 

app.get('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password; 

    var person ={
        username: username, 
        password: password
    }

    db.findOne('users', person, function(result){
        if(result != null)
            res.send('You have successfully logged in ' + result.username); 
        else    
            res.send('Invalid credentials'); 
    }); 

}); 


app.listen(port, hostname, function(){
    console.log('Server running at: '); 
    console.log('http://' + hostname + ':' + port); 
}); 

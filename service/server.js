var http = require('http')
var path = require('path')
var express = require('express')

function init(){
    var app = express();
    var port = 5555;
    app.use(express.static('./'));
    app.use(express.json());

    app.get('/',function (req, res){
        res.sendFile('sample.html', { root: '.' });
        console.log("[Request] URI: '/' ");
    });

    app.get('/hi',function (req, res){
        res.send('<p> hello~ </p>');
        console.log("[Request] URI: '/hi'");
    })

    var server = http.createServer(app);
    server.listen(port);
}

exports.init = init;

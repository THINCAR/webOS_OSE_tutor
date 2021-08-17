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

    const server = http.createServer(app);
    server.listen(port,() => {
        console.log("Express server has started");
    });
    const io = require("socket.io")(server, {
        cors: {
            origin: "https://localhost:5555",
        },
    });

    io.on("connection", socket =>{
        socket.send("Hello!");
        socket.emit("greetings", "Hey", {"ms":"jane"}, Buffer.from([4,3,3,1]));
        socket.on("message", (data) =>{
            console.log(data);
        });
        socket.on("salutations", (elem1, elem2, elem3) =>{
            console.log(elem1, elem2, elem3);
        });
    });
}

exports.init = init;

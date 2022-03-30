const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require("express-session")({
    // CIR2-chat encode in sha256
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fs = require("fs");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/front/'));
app.use(session);


const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "battleship"


});

con.connect( err => {
    if (err) throw err;
    else console.log("Connection effectuée");
});



app.route('/')

    .get((req, res) => {
        let sessionData = req.session;

        if (!sessionData.connected) {
            res.sendFile(__dirname + '/front/html/login.html')
        }
        else {
            res.sendFile(__dirname + '/front/html/index.html');
        }
    })
    .post((req, res) => {

        
        let sql = "SELECT password FROM accounts WHERE username = ?"
        con.query(sql, [req.body.login], (err, result) => {
            if (err) throw err;


            if (result.length != 0){
                bcrypt.compare(req.body.psd, result[0].password, (err, val) => {

                    if (val === true){
                        req.session.connected = true;
                        req.session.save();
                        res.redirect('/');
                    }
        
                });
            }
        });

    });



app.route('/register')

    .get((req, res) => {
        console.log("register")
        res.sendFile(__dirname + '/front/html/register.html');
    })


    .post((req, res) => {


        let sql = "SELECT idaccounts FROM accounts WHERE username = ?";
        con.query(sql, [req.body.login], (err, result) => {


            if (result.length == 0) {

                let login = req.body.login;

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.psd, salt, function (err, hash) {

                        let values = [login, hash];
                        let sql = "INSERT INTO accounts VALUES (default, ?, ?, default)";
                        con.query(sql, [values[0], values[1]], (err, result) => {
                            if (err) throw err;
                            console.log(result);

                        });
                    });
                });
                req.session.connected = true;
                req.session.save();
                res.redirect('/');
            }
        
        });
        
    });

app.get('/play', (req, res) => {

    if (req.session.connected == true){
        res.sendFile(__dirname + '/front/html/game.html');
    }

});

app.get('/leaderboard', (req, res) => {

    if (req.session.connected == true){
        res.sendFile(__dirname + '/front/html/leaderboard.html');
    }

});



let queue = [];
let games = [];

function createGames(queue) {
    let game = []
    game.push(queue[0]);
    game.push(queue[1]);
    games.push(game);
    console.log('partie complète');
};

function findSocket(socket) {

    for (let i = 0; i < games.length; i++){

        if (games[i].indexOf(socket) != -1){
            return true;
        }
    }

    return false;
};



io.on('connection', (socket) => {

    socket.on('getData', () => {
        let sql = 'SELECT * FROM accounts ORDER BY score DESC'
        con.query(sql, function (err, result) {
            if (err) throw err;

            let users = [];

            for (let i = 0; i < result.length; i++) {
                let user = [];
                user.push(result[i].username);
                user.push(result[i].score);
                users.push(user);
            }
            socket.emit('returnData', (users));
        });
    });

    socket.on('play', () => {
        queue.push(socket);

        if (queue.length == 2) {
            createGames(queue);
            queue[0].emit('start');
            queue[1].emit('start');
            queue = [];
        }

    })
});

if (app.get('env') === 'production') {

    app.set('trust proxy', 1);
    session.cookie.secure = true;

};





http.listen(4200, () => {
    console.log('Serveur lancé sur le port 4200');
});
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var session = require('express-session');

var app = new express();
var port = 3031;

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {
        console.log("Your application is running on port " + port);
    }
});

var menu = [{
        href: '/',
        text: 'Home'
    },
    {
        href: '/#about',
        text: 'About Us'
    },
    {
        href: '/#contact',
        text: 'Contact Us'
    }
];

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'reviewmethereum', resave: true, saveUninitialized: true }));

require('./src/configuration/passport')(app, passport);

var profileRouter = require('./src/routes/profileRoute')();
var acceptRouter = require('./src/routes/acceptRoute')();
var rejectRouter = require('./src/routes/rejectRoute')();


app.use('/p', profileRouter);
app.use('/accept', acceptRouter);
app.use('/reject', rejectRouter);


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.user) {
        res.redirect('/p');
    } else {
        res.render('index', {
            title: "The MarketPlace",
            navMenu: menu
        });
    }

});

app.post('/',
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
        console.log("Success");
        res.redirect('/p');
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
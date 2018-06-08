require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var exphbs = require('express-handlebars');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var request = require('request');
var bots = require('./bots/index');
var dbb = require('./dbase');
var start = require('./routes/start');
var bordcast = require('./routes/Course');
var view_course = require('./routes/view_course');
var chart = require('./routes/chart/index')
var Cats = require('./routes/Cats');
var users = require('./routes/users');
var yolo = require('./routes/yolo');
var sentiment = require('./routes/sentiment')
var survey = require('./routes/admin/survey')
var moment = require('moment')
    //var mysql = require('mysql');
var surveyBot = require('./bots/surveyBot');
var content = require('./routes/content');
var configPath = './service/linkedInConfig.json'
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || "mongodb://rocketchat:qoln5n5ayad@cluster0-shard-00-02-gest3.mongodb.net:27017/poc?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin");
var MongoDBB = mongoose.connection;
var app = express();
const statusMonitor = require('express-status-monitor')();
app.use(statusMonitor);
app.get('/dstatus', statusMonitor.pageRoute)
let mongoStorInstance = new MongoStore({
    mongooseConnection: MongoDBB,
    collection: 'sessions',
    ttl: 14 * 24 * 60 * 60
})

app.get('/response', (req, res) => {
    var Start = moment(new Date())
    request({
        url: req.query.url
    }, (err, reposs, bo) => {
        var endd = moment(new Date())

        if (reposs == undefined)
            reposs = { statusCode: 404 };
        var diffDays = endd.diff(Start, 'milesecond');
        var jsons = reposs.statusCode

        res.send({ state: jsons, time: diffDays / 1000 })
    })
})
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    store: mongoStorInstance,
    resave: true,
    cookie: {
        maxAge: 24 * 360000,
        name: "AhmedIbrahim"
    },
    name: "AhmedIbrahim"
}));



// Init passport authentication 
app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session());
passport.use(new Strategy(
    function(username, password, cb) {
        dbb.users.findByUsername(username, function(err, user) {
            console.log("login request")
            if (err) {
                console.log("error login", err)
                return cb(err);
            }
            if (!user) {
                console.log("no user from dbase")
                return cb(null, false);
            }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    dbb.users.findById(id, function(err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});
var cors = require('cors')
var cron = require('./agenda/cron')
var agenda = cron.agenda
var drips = require('./routes/drips')
var feedback_courses = require('./routes/feedback_courses')
var Agendash = require('agendash');
var corsOptions = {
    origin: function(origin, callback) {
        callback(null, true)
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.static('uploads'))
app.use(bodyParser.json());
// app.use(bodyParser.text());
app.use(fileUpload());
app.use(cookieParser());
app.use(cors())
app.use('/agenda/dash', Agendash(agenda));
app.use('/drips', drips)
app.use('/feed', feedback_courses)
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/static',express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'uploads')));
//without auth

// view engine setup
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views')
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.get('/login',
    function(req, res) {
        res.render("login", { layout: null });
    });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use("/course_view", view_course);
app.use("/api", require('./routes/yoloapi'))
app.use("/knowboss", require('./routes/knowboss'))
app.use("/status", require('./routes/status'))
app.use("/_oauth/linkedin", require('./routes/linkedIn.js'))
app.use("/user/record", require('./routes/record'))
app.use("/livechat", require('./routes/livechat'))
app.use('/soket', require('./routes/Soket.io/start'))
app.use('/chart/getAllChart', chart.getAll)
app.use('/api/message', require('./routes/message'))
app.use('/api/livechat', require('./routes/livechat'))
console.log("Service in app".bots)
app.use('/bots', bots.router)
app.use('/api/rooms', require('./routes/room'))
app.use('/teams', require('./routes/team'))

app.use('/goal', require("./routes/goal/goal"))
app.post('/survey/getsurvey', survey.getSurvey)
app.post('/survey/pushsurvey', survey.pushSurvey)
app.use('/survey/show/:id', survey.showSurvey)

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/');
    });
var Ensure = require('connect-ensure-login').ensureLoggedIn()
app.use('/Course', bordcast);
app.use('/', start);
app.use('/Cats', Cats);
app.use('/users', users);
app.use('/yolo', yolo);
app.use('/sentiment', sentiment)
app.use('/realtimechat', require('./routes/realtimechat'))

app.use('/bots/survey', surveyBot.router)

app.use('/survey', survey);
app.use('/restful', require('./restful/default-router'))
app.use('/ai', require('./routes/ai'))

app.use('/chart', chart)
app.use('/goal', require("./routes/goal/goal"))

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render("404", { layout: null })
        //next(err);
});

// error handlerg 
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(res.locals.message)

    res.status(err.status || 500);
    res.send(res.locals.message)
});

module.exports = app;
var express             = require('express'),
    bodyParser          = require('body-parser'),
    mongoose            = require('mongoose'),
    csrf                = require('csurf'),
    passport            = require('passport'),
    User                = require('./models/user'),
    session             = require('express-session'),
    localStrategy       = require('passport-local'),
    validator           = require('express-validator'),
    flash               = require('connect-flash'),
    MongoStore          = require('connect-mongo')(session),
    userRoutes          = require('./routes/user'),
    shopRoutes          = require('./routes/checkout'),
    homeRoutes          = require('./routes');
    
var app = express();
var csrfProtection = csrf();
var seedDB = require('./seed');
seedDB();
mongoose.connect("mongodb://localhost/cart", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(validator());

app.use(session( {
   secret: "mysecret",
   resave: false,
   saveUninitialized: false,
   store: new MongoStore({mongooseConnection:mongoose.connection , ttl: 14 * 24 * 60 * 60 * 1000}),
}));



app.use(flash());
app.use(csrfProtection);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next) {
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   res.locals.session = req.session;
   next();
});

// ==============
// ROUTES
// ==============

app.use(homeRoutes);
app.use(userRoutes);
app.use(shopRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("server started..............");
});
// ================
// User Routes
// ==================
var express             = require('express'),
    router              = express.Router(),
    User                = require('../models/user'),
    passport            = require('passport'),
    Order               = require('../models/order');
    
router.get('/user/signup', function(req,res) {
   res.render('user/signup',{csrfToken: req.csrfToken()});
});
router.post('/user/signup', function(req,res) {
    var username = new User({username: req.body.username});

    User.register(username, req.body.password , function(err, user) {
       if(err) {
           req.flash('error', err.message);
           return res.redirect('/user/signup');
       }  else {
            passport.authenticate('local') (req, res, function() {
                if(req.session.url) {
                    var url = req.session.url;
                    req.session.url = null;
                    res.redirect(url);
                } else {
                    res.redirect('/user/profile');
                }
           });
       }
    });
});

router.get('/user/login',function (req, res) {
   res.render('user/login',{csrfToken: req.csrfToken()}); 
});

router.post('/user/login', passport.authenticate('local', {
    //successRedirect: '/user/profile',
    failureRedirect: '/user/login'
}),function (req, res) {
    if(req.session.url) {
        var url = req.session.url;
        req.session.url = null;
        res.redirect(url);
    } else {
        res.redirect('/user/profile');
    }
    
    
});

router.get('/user/logout',function (req, res) {
  
        req.logout();
        req.flash('success', "Logged you out");
        res.redirect('/');
});

router.get('/user/profile',isLoggedIn, function(req,res) {

    Order.find({user:req.user._id}).populate({path: "user", model: 'User'}).exec(function (err, order) {
       if(err) {
           console.log("No orders");
       }  else {
           console.log(order);
           res.render('user/profile', {order: order});
       }
    });

});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', "please login");
    return res.redirect('/user/login');
}

module.exports = router;
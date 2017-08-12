var express             = require('express'),
    router              = express.Router(),
    Product             = require('../models/product'),
    Order               = require("../models/order"),
    Cart                = require('../models/cart');
    
    
 router  .get('/add-to-cart/:id', function (req, res ){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function (err, product) {
       if(err) {
           req.flash('error', "couldn't find the product");
           res.redirect('/');
       } else {
           
           cart.add(product, product.id);
           req.session.cart = cart;
           var addedProduct = product.title + " added to a cart!";
            req.flash("success", addedProduct);
           res.redirect('/');
       }
    });
    
});
 router.get('/shoppingcart', function (req, res) {
    if(!req.session.cart) {
        return res.render('shopping-cart', {product: null});
    }
    var newCart = new Cart(req.session.cart);
    req.session.url = req.url;
  res.render("shopping-cart", {product: newCart.generateArray(), totalPrice: req.session.cart.totalPrice}); 
});

 router.get('/checkout',isLoggedIn,  function (req, res) {
    if(!req.session.cart) {
        return res.redirect('/shoppingcart');
    }
    res.render('checkout',{totalPrice: req.session.cart.totalPrice, csrfToken: req.csrfToken()});
});

 router.post('/checkout', isLoggedIn,function (req, res ){
    if(!req.session.cart) {
        return res.redirect('/shoppingcart');
    }
 
    var cart = new Cart(req.session.cart);
    var stripe = require("stripe")(
        "skey"
    );

    var token = req.body.stripeToken; // Using Express

    stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: "usd",
      description: "test charge",
      source: token,
    }, function(err, charge) {
      // asynchronously called
       if(err) {
            req.flash("eror", "error charging");
            return res.redirect('/checkout');
        }
        console.log(req.user._id);
        var order = new Order({
            user: req.user._id,
            cart: cart,
            address: "my address",
            name: req.body.cardholderName,
            paymentId: charge.id
        });
        
        order.save(function(err, result) {
            if(err) {
                res.redirect('back');
            } else {
                        
                req.flash("success","Successfully Bought");
                req.session.cart = null;
                return res.redirect('/');
            }
        });
        
    });
   
    
});
 router.get("/reduceOne/:id", function(req, res) {

     var cart = new Cart(req.session.cart ? req.session.cart : {});
     
     cart.reduceOne(req.params.id);
    req.session.cart = cart;
    if(req.session.cart.totalPrice <= 0) 
        req.session.cart = null;
    res.redirect('/shoppingcart');
    
});
 router.get("/remove/:id", function(req, res) {
    console.log(req.params.id);
     var cart = new Cart(req.session.cart ? req.session.cart : {});
     
     cart.remove(req.params.id);
    req.session.cart = cart;
    if(req.session.cart.totalPrice <= 0)
        req.session.cart = null;
    res.redirect('/shoppingcart');
    
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    }else {
        req.session.url = req.url;
        res.redirect("./user/login");
    }
}


module.exports = router;
var express             = require('express'),
    router              = express.Router(),
    Product             = require('../models/product');
router.get('/', function (req, res) {
    console.log(process.env.SPKEY);
   Product.find({}, function(err, product) {
      if(err) {
         console.log("error finding...");
         
      } else {
         res.render('index',{Product: product});
      }
   });
    
});

module.exports = router;

module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  
  this.add = function(product, id) {
      var storeItem = this.items[id];
      if(!storeItem) {
          storeItem= this.items[id] = {item: product, qty: 0, price: 0};
      }
      storeItem.qty ++;
      storeItem.price = storeItem.item.price * storeItem.qty;
      this.totalQty++;
      this.totalPrice += storeItem.item.price;
  }; 
  this.reduceOne = function(id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;
    if(this.totalPrice <= 0) {
      delete this.items[id];
    }
  };
  this.remove = function(id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  };
  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
        arr.push(this.items[id]);
    }
    return arr;
  };
};
(function () {
'use strict';

angular.module('checkOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('CheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['CheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var listItems = this;
  listItems.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
  listItems.bought = function(indexItem){
    ShoppingListCheckOffService.bought(indexItem);
  }
}

AlreadyBoughtController.$inject = ['CheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var listItems = this;

  listItems.itemsBought = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListCheckOffService(){
  var service = this;

  var itemsToBuy = [
    { name: "cookies", quantity: 10 },
    { name: "pasta", quantity: 5 },
    { name: "apples", quantity: 7 },
    { name: "beers", quantity: 100 },
    { name: "wine", quantity: 50 }
  ];
  var itemsBought = [];

  service.getItemsToBuy = function(){
    return itemsToBuy;
  }

  service.bought = function(itemIndex){
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  }

  service.getItemsBought= function(){
    return itemsBought;
  }
}
})();

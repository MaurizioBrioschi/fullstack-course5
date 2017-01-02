(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective(){
  var ddo = {
  templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'search',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;

  list.isEmpty = function(){
    if(list.found===undefined){
      return true;
    }
    return list.found.length==0;
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var menu = this;
  menu.search = "";

  menu.getMenuElements = function(){
      menu.searchResults = MenuSearchService.getMatchedMenuItems(menu.search);
  }

  menu.removeItem = function(resultIndex){
    menu.searchResults.splice(resultIndex,1);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;
  service.items = [];

  service.getMatchedMenuItems = function(searchValue){
      var promise =service.getMenuItems();
      service.items = [];
      promise.then(function(response){
        var elementCount = response.data['menu_items'].length;
        for(var i=0;i<elementCount;i++){
          if(response.data['menu_items'][i]['description'].indexOf(searchValue)>0){
            service.items.push(response.data['menu_items'][i]);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      return service.items;
  }

  service.getMenuItems = function(){
    var apiUrl  = ApiBasePath + "menu_items.json";

    var response = $http({
      method: "GET",
      url: apiUrl
    });

    return response;
  }
}
})();

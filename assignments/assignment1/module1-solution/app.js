(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.message = "";
  $scope.items = "";
  $scope.class= "";
  $scope.inputClass = "";
  $scope.checkLunch = function(){
    var message = "Please enter data first";
    if($scope.items.length==0){
      $scope.message = message;
    }else{
      var number = getNumberOfItems();
      message = getMessage(number);
      $scope.message = message;
    }
    decorateMessage(message);
  }
  /**
  * calculate nunber of items
  */
  function getNumberOfItems(){
    var itemsNumber = $scope.items.split(',');
    var noEmptyItems = 0;
    for(var i=0;i<itemsNumber.length;i++){
      if(itemsNumber[i].length>0){
        noEmptyItems = noEmptyItems + 1;
      }
    }
    return noEmptyItems;
  }
  /**
  * get a message based of the number
  */
  function getMessage(number){
    if(number>3){
      return "Too much!"
    }
    return "Enjoy!";
  };

  function decorateMessage(message){
    if('Please enter data first'==message){
      $scope.class="danger-message";
      $scope.inputClass="danger-box";
    }else{
      $scope.class="message";
      $scope.inputClass="success-box";
    }
  }

}
})();

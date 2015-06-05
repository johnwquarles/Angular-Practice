angular.module("angularPractice", ['ngRoute'])

.filter('ransomcase', function() {
  return function (string) {
     return string.split('').map(function (char, i) {
       return i % 2 ? char.toUpperCase(): char.toLowerCase();
    }).join('')
  }
})

// don't want to totally destroy the key; add it as an 'id' property of the objects contained in the resultant array.
.filter('objToArr', function() {
  return function (obj) {
    if (obj) {
      return Object.keys(obj).map(function(key) {
        // need quotes around _id?
        obj[key]['_id'] = key;
        return obj[key];
      })
    }
  }
})

// pass in $http module as a dependency to the controller below.
.controller('Main', function($http) {
	var vm = this;

  $http
    .get('https://addressdiangular.firebaseio.com/things.json')
    .success(function(data) {
      vm.things = data;
    });

	// vm.things = [
 //    {name: "A Folding Chair", twitter: "@haveaseat", photo: "http://i5.walmartimages.com/dfw/dce07b8c-ba1b/k2-_8a719131-8cf9-4423-b257-69c768e43202.v1.jpg"},
 //    {name: "The Treble Cleff", twitter: "@highnotes", photo: "http://vignette1.wikia.nocookie.net/clubpenguin/images/6/66/Treble_Clef_Pin.PNG/revision/20150314211223"},
 //    {name: "An Uninflated Beach Ball", twitter: "@novolleyball", photo: "http://2.bp.blogspot.com/-eqyKkKbPPU8/Ua6DIguQd1I/AAAAAAAAFyI/ioD_Ihm8Gjg/s1600/IMG_3291.JPG"}
	// ];

	vm.newThing = {};

	vm.addNewThing = function(){
    $http
      .post('https://addressdiangular.firebaseio.com/things.json', vm.newThing)
      .success(function(response){
        vm.things[response.name] = vm.newThing;
        vm.newThing = {};
        vm.newThingForm.$setPristine();
        $("#modal").modal('hide');
      })
	};

	vm.removeThing = function(thing) {
    $http
      .delete(`https://addressdiangular.firebaseio.com/things/${thing._id}.json`)
      .success(function(){
        delete vm.things[thing._id];
      })
	};

  vm.showLightbox = function(thing) {
    var img = $("<img>");
    img.attr('src', thing.photo);
    $("#lightbox .modal-header img").replaceWith(img);
  };
})

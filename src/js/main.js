var app = angular.module("angularPractice", []);

app.controller('Main', function() {
	var vm = this;

	vm.things = [
    {name: "A Folding Chair", twitter: "@haveaseat", photo: "http://i5.walmartimages.com/dfw/dce07b8c-ba1b/k2-_8a719131-8cf9-4423-b257-69c768e43202.v1.jpg"},
    {name: "The Treble Cleff", twitter: "@highnotes", photo: "http://vignette1.wikia.nocookie.net/clubpenguin/images/6/66/Treble_Clef_Pin.PNG/revision/20150314211223"},
    {name: "An Uninflated Beach Ball", twitter: "@novolleyball", photo: "http://2.bp.blogspot.com/-eqyKkKbPPU8/Ua6DIguQd1I/AAAAAAAAFyI/ioD_Ihm8Gjg/s1600/IMG_3291.JPG"}
	];

	vm.newThing = {};

	vm.addNewThing = function(){
		vm.things.push(vm.newThing);
		vm.newThing = {};
    $("#modal").modal('hide');
	};

	vm.removeThing = function(thing) {
    vm.things.splice(vm.things.indexOf(thing), 1);
	};

  vm.showLightbox = function(thing) {
    var img = $("<img>");
    img.attr('src', thing.photo);
    $("#lightbox .modal-header img").replaceWith(img);
  };
})

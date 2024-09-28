function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, false);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url,true);
  } else {
    xhr = null;
  }
  return xhr;
}

angular.module('yoonicApp.controllers', ['fundoo.services']).controller('MediaListController',['$scope','$window', 'createDialog', function($scope,$window,createDialogService,SGmed) {
	
	
	var xhr = createCORSRequest('GET', 'http://maxis.ms.yoonic.tv/yoonic/index.php/mobile1/highlight?session_token=&display_type=free&frontpage=1&image_dimension=300x480&page=1&item_per_page=30'); 
	var xhr2 = createCORSRequest('GET', 'http://maxis.ms.yoonic.tv/yoonic/index.php/mobile1/featured'); 
	xhr.onload = function() {
			
		var result = JSON.parse(xhr.responseText);
		$scope.medias = result;
		
	};
	xhr2.onload = function() {
			
		var result = JSON.parse(xhr2.responseText);
		$scope.slides = result;
	};
	
    xhr.send();
	xhr2.send();
}]).controller('MediaViewController', ['$scope','$stateParams', 'createDialog','$state', function($scope, $stateParams,createDialogService,$state) {
	var xmlRes;
	var xhr = createCORSRequest('GET', 'http://maxis.ms.yoonic.tv/yoonic/index.php/mobile1/moviedetails?movie_id='+{ id: $stateParams.id}.id +'&session_token=123&image_dimension=36x36'); 
	  xhr.onload = function() {
			console.log($stateParams);
			var result = JSON.parse(xhr.responseText);
			$scope.media = result.movie;
			
	  };
	xhr.send();
}]).controller('ModalController', ['$scope', 'media',
		 function($scope, media) {
		 	$scope.media = media;
			
}]).filter('partition', function() {
  var cache = {};
  var filter = function(arr, size) {
    if (!arr) { return; }
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    var arrString = JSON.stringify(arr);
    var fromCache = cache[arrString+size];
    if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
      return fromCache;
    }
    cache[arrString+size] = newArr;
    return newArr;
  };
  return filter;
});
'use strict';

/* Controllers */
var usersApp = angular.module('usersApp',["firebase","angularTreeview"]);

usersApp.controller('LoadUsers',function($scope,$firebaseArray){

	var group = undefined;

	var ref = new Firebase("https://sizzling-torch-5700.firebaseio.com/users");
	$scope.users = $firebaseArray(ref);


	var ref2 = new Firebase("https://sizzling-torch-5700.firebaseio.com/groups");
	$scope.groups = $firebaseArray(ref2);


	$scope.addData = function() {
    $scope.users.$add({
      		last_name: 'Петров',
      		first_name: 'Иван',
      		date: '07-08-1991',
			email: '1c@1c.ru',
			photo: 'true',
			description: 'описание',
			group: 'role12',
		});
		
		$scope.users.$add({
			last_name: 'Сидоров',
      		first_name: 'Антон',
      		date: '07-08-1992',
			email: '2c@1c.ru',
			photo: '',
			description: 'описание',
			group: 'role11'			
    });

  	};
	$scope.testing = function()
	{
		alert('test');
	}
	var groups = [
    { "label" : "Группа1", "id" : "role1", "children" : [
        { "label" : "Подгруппа1", "id" : "role11", "children" : [] },
        { "label" : "Подгруппа2", "id" : "role12", "children" : [
            { "label" : "Подгруппа2-1", "id" : "role121", "children" : [
                { "label" : "Подгруппа2-1-1", "id" : "role1211", "children" : [] },
                { "label" : "Подгруппа2-1-2", "id" : "role1212", "children" : [] }
            ]}
        ]}
    ]},
];   
	$scope.$watch( 'abc.currentNode', function( newObj, oldObj ) {
    if( $scope.abc && angular.isObject($scope.abc.currentNode) ) {
        console.log( 'Node Selected!!' );
        group = $scope.abc.currentNode.id;
        console.log( $scope.abc.currentNode.id );
    }
}, false);
	
	$scope.treedata = groups;

	//Сортировка

	//дефолт при перезагрузке страницы
	$scope.sortField = undefined;
	$scope.reverse = false;

	$scope.sort = function(fieldName){
		if($scope.sortField === fieldName)
		{
			$scope.reverse =!$scope.reverse;
		} else {
			$scope.sortField = fieldName;
			$scope.reverse = false;
		}
	}

	$scope.isSortUp = function(fieldName){
		return $scope.sortField === fieldName && !$scope.reverse;
	}
	$scope.isSortDown = function(fieldName){
		return $scope.sortField === fieldName && $scope.reverse;
	}
});
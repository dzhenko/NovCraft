'use strict';

app.controller('MainCtrl', function($scope) {
    $scope.sampleData = [
        {name:'name 1', date:new Date('1/07/2014'), id: 1, show:true},
        {name:'name 2', date:new Date('2/07/2014'), id: 2, show:false},
        {name:'name 3', date:new Date('3/07/2014'), id: 3, show:true},
        {name:'name 4', date:new Date('4/07/2014'), id: 4, show:true},
        {name:'name 5', date:new Date('5/07/2014'), id: 5, show:false},
        {name:'name 6', date:new Date('6/07/2014'), id: 6, show:false},
        {name:'name 7', date:new Date('7/07/2014'), id: 7, show:true},
        {name:'name 8', date:new Date('8/07/2014'), id: 8, show:false},
        {name:'name 9', date:new Date('9/07/2014'), id: 9, show:true},
        {name:'name 10',date:new Date('10/07/2014'), id: 10, show:true},
        {name:'name 11',date:new Date('11/07/2014'), id: 11, show:false},
        {name:'name 12',date:new Date('12/07/2014'), id: 12, show:true}
    ]
});
'use strict';

var app = angular.module('ratingsApp', ['ngRoute']);

    app.config(function($routeProvider) {

        $routeProvider.when('/ecfcalculator', {
            templateUrl: 'templates/ChessCalculator.html',
            controller: 'RatingCalculator2Controller'
        });

        $routeProvider.otherwise({
            redirectTo: '/ecfcalculator'
        });

    });

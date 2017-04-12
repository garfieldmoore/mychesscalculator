'use strict';

var app = angular.module('ratingsApp', []);

function openFeedback() {
    $('#feedbackForm').show();
}

function closeFeedback() {
    $('#feedbackForm').hide();
}

function sendFeedback(){

  closeFeedback();
}

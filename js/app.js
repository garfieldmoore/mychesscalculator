'use strict';

var app = angular.module('ratingsApp', []);

function openFeedback() {
    $('#feedbackForm').show();
}

function closeFeedback() {
    $('#feedbackForm').hide();
}

function sendFeedback(){
  var name = $('#name').val().replace(' ','_');
  var title = $('#title').val().replace(' ','_');
  var email = $('#email').val();

  var feedback = $('#feedback_message').val();

  console.log('name ' + name);
  console.log('title ' + title);
  console.log('email ' + email);
  console.log('message ' + feedback);

  var body = {name:'garfield', title:'test message', email:'garfieldmoore@gmail.com', message:'this is a test'};
  var response = $.ajax({
             url: "http://dojodigital.co.uk/sendEmail.php?subject=" + title + "&message="+ feedback,
             method: "post",
             headers: {
              'Content-Type': 'text/plain',
             },
             success:function(response){
                  alert("success");
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                  alert("Status: " + textStatus); alert("Error: " + errorThrown);
              }
          });
  closeFeedback();
}

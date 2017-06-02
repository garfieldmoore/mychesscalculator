'use strict';

app.controller('CustomerFeedbackController', CustomerFeedbackController);

function CustomerFeedbackController($scope) {
  console.log('Enter customer feedback controller');

  $scope.sendFeedback = function() {

    var name = encodeURI($('#name').val()); 
    var title = encodeURI($('#title').val());
    // var email = encodeURI($('#email').val());

    var feedback = encodeURI($('#feedback_message').val());

    console.log('name ' + name);
    console.log('title ' + title);
    // console.log('email ' + email);
    console.log('message ' + feedback);

    // var body = {name:'garfield', title:'test message', email:'garfieldmoore@gmail.com', message:'this is a test'};
    var response = $.ajax({
      url: "http://dojodigital.co.uk/sendEmail.php?subject=" + title + " from " + name + "&message=" + feedback,
      method: "post",
      headers: {
        'Content-Type': 'text/plain',
      },
      success: function(response) {
        console.log('sent email');
        // alert("success");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      }
    });
  };
}

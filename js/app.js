'use strict';

var app = angular.module('ratingsApp', []);

function openFeedback() {
    $('#feedbackForm').show();
}

function closeFeedback() {
    $('#feedbackForm').hide();
}

function sendFeedback(){
  var name = $('#name').val();
  var title = $('#title').val();
  var email = $('#email').val();
  var feedback = $('#feedback_message').val();

  console.log('name ' + name);
  console.log('title ' + title);
  console.log('email ' + email);
  console.log('message ' + feedback);

  var body = {name:'garfield', title:'test message', email:'garfieldmoore@gmail.com', message:'this is a test'};
  // $('#contact_results').append('Thanks - We have recieved your feedback and will review it within 24 hours')

  // var response = $.ajax({
  //            url: "http://30000" + "/myapi/createIssue",
  //            method: "post",
  //            dataType:'json',
  //            data: JSON.stringify(body),
  //            headers: {
  //             'Content-Type': 'text/plain',
  //             'X-XSRF-TOKEN' : XSRFToken,
  //             'Cookie': 'workgroup_session_id='+workgroupSessionId+';XSRF-TOKEN='+XSRFToken
  //            },
  //            success:function(response){
  //                 alert("success");
  //             },
  //             error: function(XMLHttpRequest, textStatus, errorThrown) {
  //                 alert("Status: " + textStatus); alert("Error: " + errorThrown);
  //             }
  //         });
  closeFeedback();
}

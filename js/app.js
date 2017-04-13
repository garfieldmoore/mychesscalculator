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
  // $('#contact_results').append('Thanks - We have recieved your feedback and will review it within 24 hours')
//http://dojodigital.co.uk/sendEmail.php?message=final%20testmessage2&subject=finaltestsubject
// var XSRFToken='KbyUmhTLMpYj7CD2di7JKP1P3qmLlkPt';
// var workgroupSessionId='KbyUmhTLMpYj7CD2di7JKP1P3qmLlkPt'
  var response = $.ajax({
             url: "http://dojodigital.co.uk/sendEmail.php?subject=" + title + "&message="+ feedback,
             method: "post",
            //  dataType:'json',
            //  data: JSON.stringify(body),
             headers: {
              'Content-Type': 'text/plain',
              // 'X-XSRF-TOKEN' : XSRFToken,
              // 'Cookie': 'workgroup_session_id='+workgroupSessionId+';XSRF-TOKEN='+XSRFToken
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

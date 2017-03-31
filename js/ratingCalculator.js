
  function calculate(){
    console.log('Calculating Grade...')

    var currentgrade=parseInt($('#currentgrade').val());

    console.log('Current Grade:' + currentgrade);

    var grades = [];
    grades.push(parseInt($('#grade1').val()));
    grades.push(parseInt($('#grade2').val()));
    grades.push(parseInt($('#grade3').val()));
    grades.push(parseInt($('#grade4').val()));
    grades.push(parseInt($('#grade5').val()));

    console.log('Grades:');
    for (var i=0; i < grades.length; i++) {
      console.log(grades[i]);
    }

    var results = []
    results.push(parseInt( $('input[name=game1result]:checked').val()));
    results.push(parseInt( $('input[name=game2result]:checked').val()));
    results.push(parseInt( $('input[name=game3result]:checked').val()));
    results.push(parseInt( $('input[name=game4result]:checked').val()));
    results.push(parseInt( $('input[name=game5result]:checked').val()));

    console.log('Results:');;
    for (var i=0; i < grades.length; i++) {
      console.log(results[i]);
    }

    var result=0;
    var divisor=0;

    if(currentgrade!='undefined' && currentgrade>0 && !isNaN(currentgrade)){
      result=result+currentgrade;
      divisor++;
    }

    for (var i=0; i < grades.length; i++) {
      var opponentsgrade=grades[i];

      if (grades[i] !='undefined' && results[i]!='undefined' && !isNaN(grades[i]))
      {
        // the grades differ by no more than 40 rule
        if (currentgrade != 'undefined' && currentgrade>0)
          if (opponentsgrade > currentgrade+40){
            console.log('Apply the grade difference rule to opponent '+i);
            opponentsgrade=currentgrade+40;
          }

          if (opponentsgrade < currentgrade-40){
            console.log('Apply the grade difference rule to opponent '+i);
            opponentsgrade=currentgrade-40;
          }
          result=result + opponentsgrade + results[i];
          divisor++;
        }
      }


    result = result / divisor;
    result = Math.round(result);

    $('#messages').empty();
    if(isNaN(result)){
      $('#messages').append('<div>There are some invalid entries for either your grade or your opponents grades.  Correct and try again.</div>');
    }
    else{
      $('#messages').append('Your grade is now '+result);
    }
  }

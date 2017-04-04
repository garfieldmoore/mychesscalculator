'use strict';
app.factory('chessGradeCalculator', function() {
    return {
        calculate: function(currentgrade, games) {

            console.log('Current Grade:' + currentgrade);

            console.log('Grades:');
            for (var i = 0; i < games.length; i++) {
                console.log(games[i].grade);
            }

            console.log('Results:');;
            for (var i = 0; i < games.length; i++) {
                console.log(games[i].result);
            }

            var result = 0;
            var divisor = 0;

            if (currentgrade != 'undefined' && currentgrade > 0 && !isNaN(currentgrade)) {
                result = result + currentgrade;
                divisor++;
            }

            for (var i = 0; i < games.length; i++) {
                var opponentsgrade = games[i].grade;

                if (games[i].grade != 'undefined' && games[i].result != 'undefined' && !isNaN(games[i].grade)) {
                    // the grades differ by no more than 40 rule
                    if (currentgrade != 'undefined' && currentgrade > 0)
                        if (opponentsgrade > currentgrade + 40) {
                            console.log('Apply the grade difference rule to opponent ' + i);
                            opponentsgrade = currentgrade + 40;
                        }

                    if (opponentsgrade < currentgrade - 40) {
                        console.log('Apply the grade difference rule to opponent ' + i);
                        opponentsgrade = currentgrade - 40;
                    }

                    var offset;
                    if (games[i].result == 0) {
                        offset = 0;
                    } else if (games[i].result == 1) {
                        offset = 50;
                    } else {
                        offset = -50;
                    }

                    result = parseInt(result) + parseInt(opponentsgrade) + offset;
                    divisor++;
                }
            }

            result = result / divisor;
            result = Math.round(result);

            return result;
        }
    }
});

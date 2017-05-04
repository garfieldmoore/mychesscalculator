'use strict';

function IsValid(currentgrade) {
    return currentgrade != 'undefined' && currentgrade > 0 && !isNaN(currentgrade);
}

function LogGameResultInfo(game) {
    console.log('opponents grade:');
    console.log(game.grade);

    console.log('Result:');;
    console.log(game.result);
}

function ApplyMaximumGradeDifferenceRule(mygrade, opponentsgrade) {

    if (opponentsgrade > mygrade + 40) {
        console.log('Apply the grade difference rule to opponent ');
        opponentsgrade = mygrade + 40;
    }

    if (opponentsgrade < mygrade - 40) {
        console.log('Apply the grade difference rule to opponent ');
        opponentsgrade = mygrade - 40;
    }

    return opponentsgrade;
}

function GetRewardPoints(game) {

    var offset;
    if (game.result == 0) {
        offset = 0;
    } else if (game.result == 1) {
        offset = 50;
    } else {
        offset = -50;
    }

    return offset;

}

function HasResult(game) {

    return game.result != 'undefined'
}

function ApplyRoundingUpRule(grade) {

    return Math.round(grade);
}

app.factory('chessGradeCalculator', function() {
    return {
        createFor: function(chessFederation) {
            if (chessFederation === 'ELO') {
                return {
                  CalculationFrom: function(currentgrade, games) {
                      return 199;
                  }
                }
            } else {
                return {
                    CalculationFrom: function(currentgrade, games) {
                        var sumOfAllGrades = 0;
                        var numberofRatedGames = 0;

                        if (IsValid(currentgrade)) {
                            sumOfAllGrades += currentgrade;
                            numberofRatedGames++;
                        }

                        for (var i = 0; i < games.length; i++) {
                            LogGameResultInfo(games[i]);
                            var opponentsgrade = games[i].grade;

                            if (IsValid(games[i].grade) && IsValid(currentgrade) && HasResult(games[i])) {
                                opponentsgrade = ApplyMaximumGradeDifferenceRule(currentgrade, opponentsgrade);
                                var resultRewardPoints = GetRewardPoints(games[i])
                            }

                            sumOfAllGrades += opponentsgrade + resultRewardPoints;
                            numberofRatedGames++;
                        }

                        var averageGrade = ApplyRoundingUpRule(sumOfAllGrades / numberofRatedGames);
                        return averageGrade;
                    }
                }
            }

    },

    calculate: function(currentgrade, games, chessFederation) {
        console.log('Current Grade:' + currentgrade);

        var calculation = this.createFor(chessFederation);
        return calculation.CalculationFrom(currentgrade, games);

    }
}
});

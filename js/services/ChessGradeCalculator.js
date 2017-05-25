'use strict';
app.factory('chessGradeCalculator', function() {
  var kfactor = 10;

  function IsValid(currentgrade) {
    return currentgrade != 'undefined' && currentgrade > 0 && !isNaN(currentgrade);
  }

  function LogGameResultInfo(game) {
    console.log('opponents grade:');
    console.log(game.grade);

    console.log('Result:');
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
    if (game.result === 0) {
      offset = 0;
    } else if (game.result === 1) {
      offset = 50;
    } else {
      offset = -50;
    }

    return offset;

  }

  function HasResult(game) {

    return game.result != 'undefined';
  }

  function ApplyRoundingUpRule(grade) {

    return Math.round(grade);
  }

  function LogicalDistributionElo(currentgrade, games) {
    var playera = parseInt(currentgrade);
    var magic = 400;
    var expectedChances = 0;
    var result = 0;

    for (var i = 0; i < games.length; i++) {
      LogGameResultInfo(games[i]);
      var playerb = parseInt(games[i].grade);

      if (IsValid(games[i].grade) && IsValid(currentgrade) && HasResult(games[i])) {
        // expectedChances = 1 / (1 + (Math.pow((playerb - playera, 10) / magic)));
        expectedChances = playerb - playera;
        expectedChances = expectedChances / 400;
        expectedChances = Math.pow(10, expectedChances);
        expectedChances = 1 / (1 + expectedChances);

        var gameresult = games[i].result;

        if (gameresult === 0) {
          result = 0.5; // draw
        } else if (gameresult === 1) {
          result = 1; //win
        } else {
          result = 0; //loss
        }

        currentgrade = (currentgrade + kfactor * (result - expectedChances));
      }
    }

    return Math.round(currentgrade);

  }

  function EcfCalculation(currentgrade, games) {
    var sumOfAllGrades = 0;
    var numberofRatedGames = 0;
    currentgrade = parseInt(currentgrade);

    if (IsValid(currentgrade)) {
      sumOfAllGrades += currentgrade;
      numberofRatedGames++;
    }

    for (var i = 0; i < games.length; i++) {
      LogGameResultInfo(games[i]);
      var opponentsgrade = parseInt(games[i].grade);

      if (IsValid(games[i].grade) && IsValid(currentgrade) && HasResult(games[i])) {
        opponentsgrade = ApplyMaximumGradeDifferenceRule(currentgrade, opponentsgrade);
        var resultRewardPoints = GetRewardPoints(games[i]);

        sumOfAllGrades += opponentsgrade + resultRewardPoints;
        numberofRatedGames++;
      }

    }

    var averageGrade = ApplyRoundingUpRule(sumOfAllGrades / numberofRatedGames);
    return averageGrade;
  }

  function MatchedRange(difference, element) {
    // if (element == normalDistributionDifferenceLookup.length) {
    //   return true;
    // }
    var current = normalDistributionDifferenceLookup[element];
    var next = normalDistributionDifferenceLookup[element + 1];
    var isgreaterThanCurrent = difference >= current;
    var islessThanNext = difference < next;

    return isgreaterThanCurrent && islessThanNext;


  }

  function LookupExpectedWinPercentage(playerA, playerB) {
    var gradeDifference = playerA - playerB;
    var matchedChance = 0;
    for (var i = 0; i < normalDistributionDifferenceLookup.length; i++) {
      matchedChance = i;
      if (MatchedRange(gradeDifference, i)) {
        matchedChance = i;
        break;
      }
    }

    var expectatedChance = normalDistributionExpectedResultValues[matchedChance];

    return expectatedChance;
  }

  function NormalDistributionElo(currentgrade, games) {
    var playera = parseInt(currentgrade);
    var expectedChances = 0;
    var result = 0;

    for (var i = 0; i < games.length; i++) {
      LogGameResultInfo(games[i]);
      var playerb = parseInt(games[i].grade);

      if (IsValid(games[i].grade) && IsValid(currentgrade) && HasResult(games[i])) {
        // expectedChances = 1 / (1 + (Math.pow((playerb - playera, 10) / magic)));
        expectedChances = LookupExpectedWinPercentage(playera, playerb);

        var gameresult = games[i].result;

        if (gameresult === 0) {
          result = 0.5; // draw
        } else if (gameresult === 1) {
          result = 1; //win
        } else {
          result = 0; //loss
        }

        currentgrade = currentgrade + kfactor * (result - expectedChances);
      }
    }

    return Math.round(currentgrade);
  }

  function createFor(chessFederation) {
    if (chessFederation === 'ELO') {
      return {
        CalculationFrom: LogicalDistributionElo
      };
    } else if (chessFederation == 'ELO-ND') {
      return {
        CalculationFrom: NormalDistributionElo
      };
    } else {
      return {
        CalculationFrom: EcfCalculation
      };
    }
  }

  function calculate(currentgrade, games, chessFederation, player1kFactor) {
    console.log('Current Grade:' + currentgrade);

    kfactor = player1kFactor;
    var calculation = createFor(chessFederation);

    return calculation.CalculationFrom(currentgrade, games, kfactor);
  }

  return {
    createFor: createFor,
    calculate: calculate,
  };
});

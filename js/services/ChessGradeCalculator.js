'use strict';
var normalDistributionDifferenceLookup = [-9999, -735, -619, -559, -517, -484, -456, -432, -411, -391, -374, -357, -344, -328, -315, -302, -290, -278, -267, -256, -245, -235, -225, -215, -206, -197, -188, -179, -170, -162, -153, -145, -137, -129, -121, -113, -106, -98, -91, -83, -76, -68, -61, -53, -46, -39, -32, -25, -17, -10, -3,
  0,
  4,
  11,
  18,
  26,
  33,
  40,
  47,
  54,
  62,
  69,
  77,
  84,
  92,
  99,
  107,
  114,
  122,
  130,
  138,
  146,
  154,
  163,
  171,
  180,
  189,
  198,
  207,
  216,
  226,
  236,
  246,
  257,
  268,
  279,
  291,
  303,
  316,
  329,
  345,
  358,
  375,
  392,
  412,
  433,
  457,
  485,
  518,
  560,
  620,
  735,
];

var normalDistributionExpectedResultValues = [0.00,
  0.01,
  0.02,
  0.03,
  0.04,
  0.05,
  0.06,
  0.07,
  0.08,
  0.09,
  0.10,
  0.11,
  0.12,
  0.13,
  0.14,
  0.15,
  0.16,
  0.17,
  0.18,
  0.19,
  0.20,
  0.21,
  0.22,
  0.23,
  0.24,
  0.25,
  0.26,
  0.27,
  0.28,
  0.29,
  0.30,
  0.31,
  0.32,
  0.33,
  0.34,
  0.35,
  0.36,
  0.37,
  0.38,
  0.39,
  0.40,
  0.41,
  0.42,
  0.43,
  0.44,
  0.45,
  0.46,
  0.47,
  0.48,
  0.49,
  0.50,
  0.50,
  0.51,
  0.52,
  0.53,
  0.54,
  0.55,
  0.56,
  0.57,
  0.58,
  0.59,
  0.60,
  0.61,
  0.62,
  0.63,
  0.64,
  0.65,
  0.66,
  0.67,
  0.68,
  0.69,
  0.70,
  0.71,
  0.72,
  0.73,
  0.74,
  0.75,
  0.76,
  0.77,
  0.78,
  0.79,
  0.80,
  0.81,
  0.82,
  0.83,
  0.84,
  0.85,
  0.86,
  0.87,
  0.88,
  0.89,
  0.90,
  0.91,
  0.92,
  0.93,
  0.94,
  0.95,
  0.96,
  0.97,
  0.98,
  0.99,
  1.00
];

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

function LogicalDistributionElo(currentgrade, games) {
  var playera = parseInt(currentgrade);
  var k = 20;
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

      if (gameresult == 0) {
        result = 0.5; // draw
      } else if (gameresult == 1) {
        result = 1; //win
      } else {
        result = 0; //loss
      }

      currentgrade = (currentgrade + k * (result - expectedChances));
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
      var resultRewardPoints = GetRewardPoints(games[i])

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
  var next = normalDistributionDifferenceLookup[element + 1]
  var isgreaterThanCurrent = difference >= current;
  var islessThanNext =  difference < next;

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
  var k = 20;
  var expectedChances = 0;
  var result = 0;

  for (var i = 0; i < games.length; i++) {
    LogGameResultInfo(games[i]);
    var playerb = parseInt(games[i].grade);

    if (IsValid(games[i].grade) && IsValid(currentgrade) && HasResult(games[i])) {
      // expectedChances = 1 / (1 + (Math.pow((playerb - playera, 10) / magic)));
      expectedChances = LookupExpectedWinPercentage(playera, playerb);

      var gameresult = games[i].result;

      if (gameresult == 0) {
        result = 0.5; // draw
      } else if (gameresult == 1) {
        result = 1; //win
      } else {
        result = 0; //loss
      }

      currentgrade = currentgrade + k * (result - expectedChances);
    }
  }

  return Math.round(currentgrade);
}

app.factory('chessGradeCalculator', function() {
  return {
    createFor: function(chessFederation) {
      if (chessFederation === 'ELO') {
        return {
          CalculationFrom: LogicalDistributionElo
        }
      } else if (chessFederation == 'ELO-ND') {
        return {
          CalculationFrom: NormalDistributionElo
        }
      } else {
        return {
          CalculationFrom: EcfCalculation
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

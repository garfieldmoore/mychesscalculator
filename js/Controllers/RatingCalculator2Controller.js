'use strict';

function ScoreCard(playergames) {
  var playerStats = [];
  var games = []; // playergames;

  function addStat(stat) {
    playerStats.push(stat);
  }

  function score() {
    for (let i = 0; i < playerStats.length; i++) {
      playerStats[i].calculate(this.games);
    }
  }

  function setGames(playerGames) {
    this.games = playerGames;
  }

  return {
    playerStats: playerStats,
    score: score,
    addStat: addStat,
    games: games,
    setGames: setGames,
  };
}

function AverageScore() {
  var value = 0;
  var name = "Average score";

  function calculate(games) {
    var sum = 0;

    if (games === undefined || games.length === 0) {
      this.value = 0;
      return;
    }

    for (let i = 0; i < games.length; i++) {
      if ((games[i].result !== undefined)) {
        sum += Number(games[i].result);
      }
    }
    this.value = (sum / games.length);
  }

  return {
    calculate: calculate,
    name: name,
    value: value,
  };
}

function PlaceholderStat(statname) {
  var name = statname;
  var value = "";
  var type = "Placeholder";

  function calculate(games) {
    this.value = "N/A";
  }

  return {
    name: name,
    value: value,
    type: type,
    calculate: calculate,
  };
}

function FidePerformance() {
  var name = "Performance";
  var value = "N/A";

  function calculate(games) {
    this.value = "N/A";

    if (games === undefined || games.length === 0) {
      this.value = "N/A";
      return;
    }

    var stat = new AverageOpponentGrade();
    stat.calculate(games);
    var averageGrade = stat.value;

    stat = new AverageScore();
    stat.calculate(games);
    var averageScore = stat.value.toFixed(2);

    var performance = LookupExpectedWinPercentage(averageScore);

    var diff = normalDistributionPerformance[performance];
    this.value = averageGrade + diff;
  }

  function LookupExpectedWinPercentage(score) {
    var gradeDifference = score;
    var matchedChance = normalDistributionExpectedResultValues.length;
    for (var i = 0; i < normalDistributionExpectedResultValues.length; i++) {
      matchedChance = i;
      if (normalDistributionExpectedResultValues[i] == score) {
        break;
      }
    }

    return matchedChance;
  }

  return {
    name: name,
    value: value,
    calculate: calculate,
  };
}

function BestWin() {
  var name = "Best Win";
  var value = "N/A";

  function calculate(games) {

    if (games === undefined || games.length === 0) {
      return;
    }

    var highest = 0;
    var hasSet = false;
    for (let i = 0; i < games.length; i++) {
      if (Number(games[i].grade) > highest) {
        hasSet = true;
        highest = Number(games[i].grade);
      }
    }

    if (hasSet) {
      this.value = highest;
    }
  }

  return {
    name: name,
    value: value,
    calculate: calculate,
  };
}

function AverageOpponentGrade() {
  var name = 'Average opponent grade';
  var value = 'N/A';

  function calculate(games) {

    averageGrade = 'N/A';
    if (games === undefined || games.length === 0) {
      return;
    }
    var averageGrade = 0;
    var numberOfGrades = 0;
    for (let i = 0; i < games.length; i++) {
      if (!(Number(games[i].grade) === 0 || games[i].grade === undefined)) {
        averageGrade += Number(games[i].grade);
        numberOfGrades++;
      }
    }

    if (averageGrade > 0) {
      averageGrade = Math.round(averageGrade / numberOfGrades);
      this.value = averageGrade;
    }
  }
  return {
    calculate: calculate,
    name: name,
    value: value,
  };
}

function WinningStreak() {
  var name = "Winning streak";
  var value = "N/A";

  function calculate(games) {
    var wins = 0;
    var lastWinStreak = 0;

    for (let i = 0; i < games.length; i++) {
      var game = games[i];
      if (game.result == 1 && game.grade !== undefined && game.grade !== 0) {
        wins++;
      } else if (game.result != 1) {
        if (wins > lastWinStreak) {
          lastWinStreak = wins;
        }
        wins = 0;
      }
    }

    if (wins > lastWinStreak) {
      lastWinStreak = wins;
    }

    if (lastWinStreak > 0) {
      this.value = lastWinStreak;
    }
  }

  return {
    calculate: calculate,
    name: name,
    value: value,
  };
}

app.controller('RatingCalculator2Controller',
  function RatingCalculator2Controller($scope, chessGradeCalculator) {
    console.log('Enter default controller');

    $scope.player = {
      grade: 1200,
    };

    $scope.kfactors = {
      availableOptions: [{
          id: 10,
          name: '10'
        },
        {
          id: 20,
          name: '20'
        },
        {
          id: 30,
          name: '40'
        }
      ],
      selectedOption: {
        id: 20,
        name: '20'
      } //This sets the default value of the select in the ui
    };

    $scope.chessFederations = ['FIDE ELO', 'USCF ELO', 'ECF'];
    $scope.selectedChessFederation = 'FIDE ELO';
    $scope.selectedGame = 0;

    $scope.dropboxitemselected = function(item) {

      $scope.selectedChessFederation = item;
    };

    $scope.$watch("selectedChessFederation", function(newValue, oldValue) {

      if ($scope.selectedChessFederation == "FIDE ELO") {
        $scope.scoreCard.playerStats[0] = new FidePerformance();
      } else {
        $scope.scoreCard.playerStats[0] = new PlaceholderStat("Performance");
      }

      $scope.scoreCard.playerStats[0].calculate();
    });

    $scope.dropboxResultitemselected = function(game, result) {
      game.result = result;
      if (game.result === 1) {
        game.resultText = 'Win';
      } else if (game.result === 0) {
        game.resultText = 'Draw';
      } else {
        game.resultText = 'Loss';
      }
    };

    $scope.dropboxselectKfactor = function(kfactor) {
      $scope.selectedKfactor = 20;
    };

    $scope.games = [];

    $scope.scoreCard = new ScoreCard();

    $scope.scoreCard.addStat(new FidePerformance());
    $scope.scoreCard.addStat(new BestWin());
    $scope.scoreCard.addStat(new WinningStreak());
    $scope.scoreCard.addStat(new AverageOpponentGrade());

    $scope.scoreCard.games = $scope.games;

    $scope.scoreCard.score();

    $scope.addNewGame = function() {
      console.log("Adding new game");
      var newItemNo = $scope.games.length + 1;
      $scope.games.push({
        'id': newItemNo,
        resultText: 'Win',
        result: 1,
      });

      $scope.selectedGame = $scope.games.length - 1;
      $scope.scoreCard.games = $scope.games;
    };

    $scope.addNewGame();

    $scope.removeChoice = function(index) {

      if ($scope.games.length > 1) {
        $scope.games.splice(index, 1);
      } else {
        console.log('Cannot remove last game');
      }

    };

    // fields description of entity
    $scope.fields = [{
        name: 'grade',
        title: 'Grade',
        required: true,
        cssClassing: 'testing',
        type: {
          view: 'input'
        }
      },
      {
        name: 'result',
        title: 'Result',
        required: true,
        cssClassing: 'testing',
        type: {
          view: 'radio'
        }
      },
      {
        name: 'resultText',
        title: 'ResultText',
        required: false,
        cssClassing: 'testing',
        type: {
          view: 'input'
        }
      },
    ];

    $scope.calculate = function() {
      console.log('Calculating Grade...');
      var currentgrade = parseInt($scope.player.grade);

      var calculationType = 'ECF';
      if ($scope.selectedChessFederation == 'FIDE ELO') {
        calculationType = 'ELO-ND';
      } else if ($scope.selectedChessFederation == 'USCF ELO') {
        calculationType = 'ELO';
      }

      var kfactor = $scope.kfactors.selectedOption.id;
      var result = chessGradeCalculator.calculate(currentgrade, $scope.games, calculationType, kfactor);

      result = Math.round(result);

      $scope.scoreCard.score();

      $('#messages').empty();
      $('#stat_current_grade').empty();
      if (isNaN(result)) {
        $('#messages').append('<div><p>There are some invalid entries for either your grade or your opponents grades.  Correct and try again.</p></div>');
      } else {
        $('#stat_current_grade').append(result);
      }
    };
  }
);

'use strict'
app.controller('RatingCalculator2Controller',
    function RatingCalculator2Controller($scope, chessGradeCalculator) {
        console.log('Enter controller');

        $scope.player = {
            grade: '',
        };

        $scope.games = [];
        for (var i = 0; i < 4; i++) {
            var g = {
                id: "game" + i,
                result: 1
            };
            $scope.games[i] = g;
        }

        $scope.addNewGame = function() {
            console.log("Adding new game");
            var newItemNo = $scope.games.length + 1;
            $scope.games.push({
                'id': 'game' + newItemNo,
                result: 1
            });
        };

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
                title: 'Result`',
                required: true,
                cssClassing: 'testing',
                type: {
                    view: 'radio'
                }
            },


        ];

        $scope.calculate = function() {
            console.log('Calculating Grade...')
            var currentgrade = parseInt($scope.player.grade);
            var result = chessGradeCalculator.calculate(currentgrade, $scope.games);

            $('#messages').empty();
            if (isNaN(result)) {
                $('#messages').append('<div>There are some invalid entries for either your grade or your opponents grades.  Correct and try again.</div>');
            } else {
                $('#messages').append('Your grade is now ' + result);
            }
        }
    }
);

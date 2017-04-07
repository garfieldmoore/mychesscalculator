QUnit.module('EcfCalculator', {
  setup: function(){

  },
  teardown: function(){

  }

});

QUnit.test('calculate should return players current grade when no games have been played', function() {

    var $injector = angular.injector(['ratingsApp']);
    var myService = $injector.get('chessGradeCalculator');

    var grade = myService.calculate(102, []);
    QUnit.assert.strictEqual(grade, 102, "The grades should be the same")
});

QUnit.test('current grade should not change when all the games played are drawn with players of the same grade', function() {

    var $injector = angular.injector(['ratingsApp']);
    var myService = $injector.get('chessGradeCalculator');

    var games=[{id:'game1', grade:102, result: 0}, {id:'game2', grade:102, result:0}]

    var grade = myService.calculate(102, games);
    QUnit.assert.strictEqual(grade, 102, "The grades should be the same")
});

QUnit.module('Maximum grade difference is 40 rule', {
  setup: function(){

  },
  teardown: function(){

  }

});

QUnit.test('grade should increase to 145 when a 100 grade beats a 150 grade ', function() {

    var $injector = angular.injector(['ratingsApp']);
    var myService = $injector.get('chessGradeCalculator');

    var games=[{id:'game1', grade:150, result: 1}]

    var grade = myService.calculate(100, games);
    QUnit.assert.strictEqual(grade, 145, "grade increases")
});

QUnit.test('grade should decrease to 120 when a 150 grade loses to a 100 grade ', function() {

    var $injector = angular.injector(['ratingsApp']);
    var myService = $injector.get('chessGradeCalculator');

    var games=[{id:'game1', grade:100, result: -1}]

    var grade = myService.calculate(150, games);
    QUnit.assert.strictEqual(grade, 105, "grade decreases")
});

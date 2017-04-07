QUnit.module('EcfCalculator', {
  setup: function(){

  },
  teardown: function(){

  }

});

QUnit.test('grade should increase to 130 when a 100 grade beats a 110 grade', function() {

    var $injector = angular.injector(['ratingsApp']);
    var myService = $injector.get('chessGradeCalculator');

    var games=[{id:'game1', grade:110, result: 1}]

    var grade = myService.calculate(100, games);
    QUnit.assert.strictEqual(grade, 130, "grade increases")
});

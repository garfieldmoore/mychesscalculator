QUnit.module('EcfCalculator', {
  setup: function(){

  },
  teardown: function(){

  }

});

QUnit.test('grade should decrease to 85 when a 100 grade loses to a 120 grade', function() {

    var $injector = angular.injector(['ratingsApp']);
    var myService = $injector.get('chessGradeCalculator');

    var games=[{id:'game1', grade:120, result: -1}]

    var grade = myService.calculate(100, games);
    QUnit.assert.strictEqual(grade, 85, "grade decreases")
});

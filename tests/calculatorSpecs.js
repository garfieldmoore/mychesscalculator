QUnit.module('EcfCalculator');

QUnit.test('calculate should return players current grade when no games have been played', function() {

    var $injector = angular.injector(['ratingsApp']);
    var myService = $injector.get('chessGradeCalculator');

    var grade = myService.calculate(102, []);
    QUnit.assert.strictEqual(grade, 102, "The grades should be the same")
});

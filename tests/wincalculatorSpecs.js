describe("Calculating wins", function() {

    beforeEach(function() {
        $injector = angular.injector(['ratingsApp']);
        myService = $injector.get('chessGradeCalculator');

    });

    it('grade should increase to 130 when a 100 grade beats a 110 grade', function() {
      $injector = angular.injector(['ratingsApp']);
      myService = $injector.get('chessGradeCalculator');

        var games = [{
            id: 'game1',
            grade: 110,
            result: 1
        }]

        var grade = myService.calculate(100, games);
        expect(grade).toEqual(130, "grade increases")
    });
});

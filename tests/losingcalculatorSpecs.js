describe("losing games", function() {

    beforeEach(function() {
        $injector = angular.injector(['ratingsApp']);
        myService = $injector.get('chessGradeCalculator');

    });

    it('grade should decrease to 85 when a 100 grade loses to a 120 grade', function() {

        var games = [{
            id: 'game1',
            grade: 120,
            result: -1
        }]

        var grade = myService.calculate(100, games);
        expect(grade).toEqual(85, "grade decreases")
    });
});

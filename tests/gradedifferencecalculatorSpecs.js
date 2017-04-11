describe("Maximum grade difference rule", function() {

    beforeEach(function() {
        $injector = angular.injector(['ratingsApp']);
        myService = $injector.get('chessGradeCalculator');

    });

    it('grade should increase to 145 when a 100 grade beats a 150 grade ', function() {

        var games = [{
            id: 'game1',
            grade: 150,
            result: 1
        }]

        var grade = myService.calculate(100, games);
        expect(grade).toEqual(145, "grade increases")
    });

    it('grade should decrease to 120 when a 150 grade loses to a 100 grade ', function() {

        var games = [{
            id: 'game1',
            grade: 100,
            result: -1
        }]

        var grade = myService.calculate(150, games);
        expect(grade).toEqual(105, "grade decreases")
    });
});

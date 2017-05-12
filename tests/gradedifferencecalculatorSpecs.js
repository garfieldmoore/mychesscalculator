describe("Maximum grade difference rule", function() {

  beforeEach(function() {
    module('ratingsApp');
  });

  it('grade should increase to 145 when a 100 grade beats a 150 grade ', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 150,
      result: 1
    }]

    var grade = chessGradeCalculator.calculate(100, games);
    expect(grade).toEqual(145, "grade increases")
  }));

  it('grade should decrease to 120 when a 150 grade loses to a 100 grade ', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 100,
      result: -1
    }]

    var grade = chessGradeCalculator.calculate(150, games);
    expect(grade).toEqual(105, "grade decreases")
  }));
});

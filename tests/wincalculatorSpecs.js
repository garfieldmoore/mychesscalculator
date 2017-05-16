describe("ECF Calculating wins", function() {

  beforeEach(function() {
    module('ratingsApp');
  });

  it('grade should increase to 130 when a 100 grade beats a 110 grade', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 110,
      result: 1
    }]

    var grade = chessGradeCalculator.calculate(100, games,'ECF');
    expect(grade).toEqual(130, "grade increases")
  }));

  it('converts from strings to numbers', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: '110',
      result: 1
    }]

    var grade = chessGradeCalculator.calculate('100', games,'ECF');
    expect(grade).toEqual(130, "grade increases")
  }));
});

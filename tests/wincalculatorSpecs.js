describe("ECF Calculating wins", () => {

  beforeEach(function() {
    module('ratingsApp');
  });

  var chessGradeCalculator;
  beforeEach(inject(['chessGradeCalculator', function(service) {
    chessGradeCalculator = service;
  }]));

  it('grade should increase to 130 when a 100 grade beats a 110 grade', () => {

    var games = [{
      id: 'game1',
      grade: 110,
      result: 1
    }];

    var grade = chessGradeCalculator.calculate(100, games, 'ECF');
    expect(grade).toEqual(130, "grade increases");
  });

  it('converts from strings to numbers', () => {

    var games = [{
      id: 'game1',
      grade: '110',
      result: 1
    }];

    var grade = chessGradeCalculator.calculate('100', games, 'ECF');
    expect(grade).toEqual(130, "grade increases");
  });
});

describe("Calculating wins", function() {

  beforeEach(function() {
    module('ratingsApp');

  });

  it('should calcuate a 2000 player beating a 1953 player as having new FIDE elo of 2009', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 1953,
      result: 1
    }]

    var grade = chessGradeCalculator.calculate(2000, games, 'ELO');
    expect(grade).toEqual(2009, "grade increases")
  }));

  it('converts from strings to numbers', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: '1953',
      result: 1
    }]

    var grade = chessGradeCalculator.calculate('2000', games, 'ELO');
    expect(grade).toBeGreaterThan(2000, "should be a number");
  }));
});

describe("USCF ELO wins", () => {

  beforeEach(function() {
    module('ratingsApp');
  });

  var chessGradeCalculator;
  beforeEach(inject(['chessGradeCalculator', function(service) {
    chessGradeCalculator = service;
  }]));

  it('should calcuate a 2000 player beating a 1953 player as having new USCF elo of 2009', () => {

    var games = [{
      id: 'game1',
      grade: 1953,
      result: 1
    }];

    var grade = chessGradeCalculator.calculate(2000, games, 'ELO', 20);
    expect(grade).toEqual(2009, "grade increases");
  });

  it('converts from strings to numbers', () => {

    var games = [{
      id: 'game1',
      grade: '1953',
      result: 1
    }];

    var grade = chessGradeCalculator.calculate('2000', games, 'ELO', 20);
    expect(grade).toBeGreaterThan(2000, "should be a number");
  });
});

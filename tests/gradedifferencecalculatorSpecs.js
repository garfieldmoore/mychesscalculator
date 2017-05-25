describe("ECF Maximum grade difference rule", () => {

  beforeEach(function() {
    module('ratingsApp');
  });

  var chessGradeCalculator;
  beforeEach(inject(['chessGradeCalculator', function(service) {
    chessGradeCalculator = service;
  }]));

  it('grade should increase to 145 when a 100 grade beats a 150 grade ', () => {

    var games = [{
      id: 'game1',
      grade: 150,
      result: 1
    }];

    var grade = chessGradeCalculator.calculate(100, games, 'ECF');
    expect(grade).toEqual(145, "grade increases");
  });

  it('grade should decrease to 120 when a 150 grade loses to a 100 grade ', () => {

    var games = [{
      id: 'game1',
      grade: 100,
      result: -1
    }];

    var grade = chessGradeCalculator.calculate(150, games, 'ECF');
    expect(grade).toEqual(105, "grade decreases");
  });
});

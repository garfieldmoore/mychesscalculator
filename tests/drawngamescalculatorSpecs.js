describe("Calculating ECF drawn games", () => {

  beforeEach(function() {
    module('ratingsApp');
  });

  var chessGradeCalculator;
  beforeEach(inject(['chessGradeCalculator', function(service) {
    chessGradeCalculator = service;
  }]));

  it('calculate should return players current grade when no games have been played', () => {

    var grade = chessGradeCalculator.calculate(102, [], 'ECF');
    expect(grade).toEqual(102, "The grades should be the same");
  });

  it('current grade should not change when all the games played are drawn with players of the same grade', () => {

    var games = [{
      id: 'game1',
      grade: 102,
      result: 0
    }, {
      id: 'game2',
      grade: 102,
      result: 0
    }];

    var grade = chessGradeCalculator.calculate(102, games, 'ECF');
    expect(grade).toEqual(102, "The grades should be the same");
  });

  it('new grade should increase to 110 when a 100 grade draws with a 120 grade', () => {

    var games = [{
      id: 'game2',
      grade: 120,
      result: 0
    }];

    var grade = chessGradeCalculator.calculate(100, games, 'ECF');
    expect(grade).toEqual(110, "The grades should be the same");
  });

  it('new grade should decrease to 90 when a 100 grade draws with an 80 grade', () => {

    var games = [{
      id: 'game2',
      grade: 80,
      result: 0
    }];

    var grade = chessGradeCalculator.calculate(100, games, 'ECF');
    expect(grade).toEqual(90, "The grades should be the same");
  });
});

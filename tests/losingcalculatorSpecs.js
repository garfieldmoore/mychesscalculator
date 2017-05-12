describe("losing games", function() {

  beforeEach(function() {
    module('ratingsApp');
  });

  it('grade should decrease to 85 when a 100 grade loses to a 120 grade', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 120,
      result: -1
    }]

    var grade = chessGradeCalculator.calculate(100, games);
    expect(grade).toEqual(85, "grade decreases")
  }));
});

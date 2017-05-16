describe("FIDE ELO wins", function() {

  beforeEach(function() {
    module('ratingsApp');

  });

  it('should calcuate a 2000 player beating a 2400 player twice as having new FIDE elo of 2037', inject(function(chessGradeCalculator) {

    var games = [{
        id: 'game1',
        grade: 2400,
        result: 1
      },
      {
        id: 'game1',
        grade: 2400,
        result: 1
      }
    ];

    var grade = chessGradeCalculator.calculate(2000, games, 'ELO-ND',20);
    expect(grade).toEqual(2037, "grade increases");
  }))

  it('should find expected win ratio of 0 (first lookup item)', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 2000 + -9999,
      result: 1
    }];

    var grade = chessGradeCalculator.calculate(2000, games, 'ELO-ND',20);
    expect(grade).toEqual(2000, "grade increases");
  }))

  it('should find maximum win ration of 1 - last lookup item', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 2737,
      result: 1
    }];

    var grade = chessGradeCalculator.calculate(2000, games, 'ELO-ND',20);
    expect(grade).toEqual(2020, "grade increases");
  }))

  it('should find match on boundary', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 2000 + 735,
      result: 1
    }];

    var grade = chessGradeCalculator.calculate(2000, games, 'ELO-ND',20);
    expect(grade).toEqual(2020, "grade increases"); // actually 2019.8
  }))

  it('should find match on boundary plus 1', inject(function(chessGradeCalculator) {

    var games = [{
      id: 'game1',
      grade: 2000 + 484,
      result: 1
    }];

    var grade = chessGradeCalculator.calculate(2000, games, 'ELO-ND',20);
    expect(grade).toEqual(2019, "grade increases");
  }))

});

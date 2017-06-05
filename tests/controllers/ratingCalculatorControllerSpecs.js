describe('rating calculator controller', () => {
  var controllerService;
  var sut;
  var scope;
  var mockChessCalculator;

  beforeEach(module('ratingsApp'));

  beforeEach(inject(function($controller, $rootScope) {
    controllerService = $controller;
    scope = $rootScope.$new();
    mockChessCalculator = jasmine.createSpy('ChessGradeCalculator', 'MyMethod');

    sut = controllerService("RatingCalculator2Controller", {
      '$scope': scope,
      'chessGradeCalculator': mockChessCalculator
    });

  }));

  it('creates statistics', ()=>{

    expect(scope.scoreCard.playerStats[0].name).toEqual(new FidePerformance().name);
    expect(scope.scoreCard.playerStats[0].value).toEqual("N/A");

    expect(scope.scoreCard.playerStats[1].name).toEqual(new BestWin().name);
    expect(scope.scoreCard.playerStats[1].value).toEqual("N/A");

    expect(scope.scoreCard.playerStats[2].name).toEqual(new WinningStreak().name);
    expect(scope.scoreCard.playerStats[2].value).toEqual("N/A");

    expect(scope.scoreCard.playerStats[3].name).toEqual(new AverageOpponentGrade().name);
    expect(scope.scoreCard.playerStats[3].value).toEqual("N/A");

  });

  it('Performance stat should be disabled when not FIDE ELO', ()=>{
    scope.selectedChessFederation = "ECF";
    scope.$apply();
    expect(scope.scoreCard.playerStats[0].type).toEqual("Placeholder");

    scope.selectedChessFederation = "FIDE ELO";
    scope.$apply();

    expect(scope.scoreCard.playerStats[0].type).toEqual(new FidePerformance().type);

  });



  describe('add new game', () => {

    it('should create one game by default with default values', () => {

      expect(scope.games.length).toEqual(1);
      expect(scope.games[0].result).toBe(1);
      expect(scope.games[0].resultText).toBe('Win');
      expect(scope.games[0].id).toEqual(1);

    });


    it('should create new game with default values', () => {

      scope.addNewGame();
      expect(scope.games.length).toEqual(2);
      expect(scope.games[1].result).toBe(1);
      expect(scope.games[1].resultText).toBe('Win');
      expect(scope.games[1].id).toEqual(2);
    });
  });

  describe('remove game', () => {

    it('should remove selected game', () => {
      scope.addNewGame();
      scope.addNewGame();

      expect(scope.games.length).toEqual(3);

      scope.removeChoice(2);

      expect(scope.games.length).toEqual(2);

    });
  });

  describe('calculate', () => {

    it('should call calculator', () => {

    });
  });
});

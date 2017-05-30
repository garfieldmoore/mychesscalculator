describe('rating calculator controller', () => {
  describe('add new game', () => {
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
});

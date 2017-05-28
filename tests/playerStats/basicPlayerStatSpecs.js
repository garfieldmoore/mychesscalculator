describe('player statistics', () => {

  describe('best win stat', () => {
    var scorecard;

    it('displays not applicable when no games', () => {
      scorecard = new ScoreCard();
      scorecard.addStat(new BestWin());
      scorecard.score();

      expect(scorecard.playerStats[0].name).toBe("Best Win");
      expect(scorecard.playerStats[0].value).toBe("N/A");
    });

    it('result is single opponents grade', () => {
      var games = [{
        grade: 1200,
      }];

      scorecard = new ScoreCard();
      scorecard.addStat(new BestWin());
      scorecard.games = games;
      scorecard.score();

      expect(scorecard.playerStats[0].name).toBe("Best Win");
      expect(scorecard.playerStats[0].value).toBe(1200);
    });

    it('should be not applicable if player had undefined rating', () => {
      var games = [{
        result: 1,
      }];

      var bestwin = new BestWin();
      bestwin.calculate(games);

      expect(bestwin.value).toBe("N/A");
    });

    it('should convert strings to numbers', () => {
      var games = [{
        grade: '10',
      }, {grade:'5'}];

      var bestwin = new BestWin();
      bestwin.calculate(games);

      expect(bestwin.value).toBe(10);
    });

  });

  describe('average opponent grade', () => {

    it('should default to not appplicable', () => {
      var ag = new AverageOpponentGrade();

      expect(ag.name).toBe('Average opponent grade');
      expect(ag.value).toBe('N/A');

    });

    it('should be not appplicable when no games played', () => {
      var ag = new AverageOpponentGrade();
      var games = [];

      ag.calculate(games);

      expect(ag.value).toBe('N/A');

    });

    it('should average opponents grades', () => {
      var ag = new AverageOpponentGrade();
      var games = [{
        grade: 10
      }, {
        grade: 12
      }];

      ag.calculate(games);

      expect(ag.value).toBe(11);

    });

    it('should round average opponents grades', () => {
      var ag = new AverageOpponentGrade();
      var games = [{
        grade: 11
      }, {
        grade: 12
      }];

      ag.calculate(games);

      expect(ag.value).toBe(12);

    });

    it('should ignore zero grades', () => {
      var ag = new AverageOpponentGrade();
      var games = [{
        grade: 10
      }, {
        grade: 0
      }];

      ag.calculate(games);

      expect(ag.value).toBe(10);

    });

    it('should ignore undefined grades', () => {
      var ag = new AverageOpponentGrade();
      var games = [{
        grade: 10
      }, {grade:undefined}];

      ag.calculate(games);

      expect(ag.value).toBe(10);

    });

    it('zero grade is shown as N/A', ()=>{
      var ag = new AverageOpponentGrade();
      var games=[{grade:0},{grade:0}];

      ag.calculate(games);

      expect(ag.value).toBe('N/A');
    })

    it('should convert strings to numbers', () => {
      var ag = new AverageOpponentGrade();
      var games = [{
        grade: '10'
      }, {grade:'5'}];

      ag.calculate(games);

      expect(ag.value).toBe(8);

    });

  });
});

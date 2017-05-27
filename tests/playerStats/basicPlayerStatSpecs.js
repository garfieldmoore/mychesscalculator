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

  it('should be not applicable if player had undefined rating', ()=>{
    var games = [{
      result: 1,
    }];

    var bestwin = new BestWin()
    bestwin.calculate(games);

    expect(bestwin.value).toBe("N/A");
  })
});

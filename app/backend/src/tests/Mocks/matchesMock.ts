const mockOfMatches = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Grêmio"
      }
    },
  ];

const create = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const error = {
  homeTeamId: 1,
  awayTeamId: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const resultcreate = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true
}

  export {
    mockOfMatches,
    create,
    resultcreate,
    error,
  };
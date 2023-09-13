import ILeaderboard from '../Interfaces/LeaderboardInterface';
import IMatches from '../Interfaces/MatchesInterface';

const createdTeam = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const resetTheTeam = () => {
  createdTeam.name = '';
  createdTeam.totalPoints = 0;
  createdTeam.totalGames = 0;
  createdTeam.totalVictories = 0;
  createdTeam.totalDraws = 0;
  createdTeam.totalLosses = 0;
  createdTeam.goalsFavor = 0;
  createdTeam.goalsOwn = 0;
  createdTeam.goalsBalance = 0;
  createdTeam.efficiency = 0;
};

const homeVictories = (homeGoals: number, awayGoals: number) => {
  createdTeam.totalPoints += 3;
  createdTeam.totalVictories += 1;
  createdTeam.goalsFavor += homeGoals;
  createdTeam.goalsOwn += awayGoals;
};

const awayVictories = (homeGoals: number, awayGoals: number) => {
  createdTeam.totalPoints += 3;
  createdTeam.totalVictories += 1;
  createdTeam.goalsFavor += awayGoals;
  createdTeam.goalsOwn += homeGoals;
};

const homeLoses = (homeGoals: number, awayGoals: number) => {
  createdTeam.totalLosses += 1;
  createdTeam.goalsFavor += homeGoals;
  createdTeam.goalsOwn += awayGoals;
};

const awayLoses = (homeGoals: number, awayGoals: number) => {
  createdTeam.totalLosses += 1;
  createdTeam.goalsFavor += awayGoals;
  createdTeam.goalsOwn += homeGoals;
};

const homeDraws = (homeGoals: number, awayGoals: number) => {
  createdTeam.totalPoints += 1;
  createdTeam.totalDraws += 1;
  createdTeam.goalsFavor += homeGoals;
  createdTeam.goalsOwn += awayGoals;
};

const awayDraws = (homeGoals: number, awayGoals: number) => {
  createdTeam.totalPoints += 1;
  createdTeam.totalDraws += 1;
  createdTeam.goalsFavor += awayGoals;
  createdTeam.goalsOwn += homeGoals;
};

const homeTotalPoints = (matches: IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) {
      homeVictories(homeTeamGoals, awayTeamGoals);
    } else if (homeTeamGoals < awayTeamGoals) {
      homeLoses(homeTeamGoals, awayTeamGoals);
    } else {
      homeDraws(homeTeamGoals, awayTeamGoals);
    }
  });
};

const awayTotalPoints = (matches: IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) {
      awayVictories(homeTeamGoals, awayTeamGoals);
    } else if (homeTeamGoals > awayTeamGoals) {
      awayLoses(homeTeamGoals, awayTeamGoals);
    } else {
      awayDraws(homeTeamGoals, awayTeamGoals);
    }
  });
};

const homeResult = (name: string, matches: IMatches[]) => {
  if (createdTeam.name !== name) resetTheTeam();
  createdTeam.name = name;
  createdTeam.totalGames += 1;
  homeTotalPoints(matches);
  createdTeam.goalsBalance = createdTeam.goalsFavor - createdTeam.goalsOwn;
  createdTeam.efficiency = Number(((createdTeam.totalPoints / (createdTeam.totalGames * 3)) * 100)
    .toFixed(2));
  return createdTeam;
};

const awayResult = (name: string, matches: IMatches[]) => {
  if (createdTeam.name !== name) resetTheTeam();
  createdTeam.name = name;
  createdTeam.totalGames += 1;
  awayTotalPoints(matches);
  createdTeam.goalsBalance = createdTeam.goalsFavor - createdTeam.goalsOwn;
  createdTeam.efficiency = Number(((createdTeam.totalPoints / (createdTeam.totalGames * 3)) * 100)
    .toFixed(2));
  return createdTeam;
};

const leaderboardOrder = (leaderboard: ILeaderboard[]) => {
  const sortLeader = leaderboard.sort((a, b) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.goalsBalance === b.goalsBalance) {
        return b.goalsFavor - a.goalsFavor;
      }
      return b.goalsBalance - a.goalsBalance;
    }
    return b.totalPoints - a.totalPoints;
  });
  return sortLeader;
};

export { homeResult, awayResult, leaderboardOrder };

import ILeaderboard from '../Interfaces/ILeaderboard';
import IMatches from '../Interfaces/IMatches';

const teamCreate = {
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

const teamReset = () => {
  teamCreate.name = '';
  teamCreate.totalPoints = 0;
  teamCreate.totalGames = 0;
  teamCreate.totalVictories = 0;
  teamCreate.totalDraws = 0;
  teamCreate.totalLosses = 0;
  teamCreate.goalsFavor = 0;
  teamCreate.goalsOwn = 0;
  teamCreate.goalsBalance = 0;
  teamCreate.efficiency = 0;
};

const victoriesHome = (homeGoals: number, awayGoals: number) => {
  teamCreate.totalPoints += 3;
  teamCreate.totalVictories += 1;
  teamCreate.goalsFavor += homeGoals;
  teamCreate.goalsOwn += awayGoals;
};

const lossesHome = (homeGoals: number, awayGoals: number) => {
  teamCreate.totalLosses += 1;
  teamCreate.goalsFavor += homeGoals;
  teamCreate.goalsOwn += awayGoals;
};

const drawsHome = (homeGoals: number, awayGoals: number) => {
  teamCreate.totalPoints += 1;
  teamCreate.totalDraws += 1;
  teamCreate.goalsFavor += homeGoals;
  teamCreate.goalsOwn += awayGoals;
};

const homeTotalPoints = (matches: IMatches[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) {
      victoriesHome(homeTeamGoals, awayTeamGoals);
    } else if (homeTeamGoals < awayTeamGoals) {
      lossesHome(homeTeamGoals, awayTeamGoals);
    } else {
      drawsHome(homeTeamGoals, awayTeamGoals);
    }
  });
};

const orderLeaderboard = (leaderboard: ILeaderboard[]) => {
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

const resultHome = (name: string, matches: IMatches[]) => {
  if (teamCreate.name === name) teamReset();
  teamCreate.name = name;
  teamCreate.totalGames += 1;
  homeTotalPoints(matches);
  teamCreate.goalsBalance = teamCreate.goalsFavor - teamCreate.goalsOwn;
  teamCreate.efficiency = Number((teamCreate.totalPoints / (teamCreate.totalGames * 3)) * 100);
  return teamCreate;
};

export { resultHome, orderLeaderboard };

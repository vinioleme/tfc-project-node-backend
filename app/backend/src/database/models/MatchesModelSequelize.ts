import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsModelSequelize from './TeamsModelSequelize';

class MatchesModelSequelize extends Model<InferAttributes<MatchesModelSequelize>,
InferCreationAttributes<MatchesModelSequelize>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

/**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */

MatchesModelSequelize.belongsTo(TeamsModelSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModelSequelize.belongsTo(TeamsModelSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamsModelSequelize.hasMany(MatchesModelSequelize, { foreignKey: 'homeTeamId', as: 'homeMatch' });
TeamsModelSequelize.hasMany(MatchesModelSequelize, { foreignKey: 'awayTeamId', as: 'awayMatch' });

export default MatchesModelSequelize;

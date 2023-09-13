import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import {returnOfMock, teamMock} from './Mocks/leaderboardMock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  it('testa quando a rota GET /leaderboard/home retorna lista', async () => {
    sinon.stub(TeamsModelSequelize, 'findAll').resolves(teamMock as any);
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(returnOfMock as any);

    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');

  });

  it('testa quando a rota GET /leaderboard retorna lista', async () => {
    sinon.stub(TeamsModelSequelize, 'findAll').resolves(teamMock as any);
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(returnOfMock as any);

    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');

  });

  afterEach(() => {
    sinon.restore();
  });

});

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { teams, team } from './Mocks/Teams.mock';

import { app } from '../app';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do teams', () => {

  it('testa se GET /teams retorna todos os times corretamente', async () => {
    sinon.stub(TeamsModelSequelize, 'findAll').resolves(teams as any);

    const result = await chai.request(app).get('/teams');

    const { body, status } = result;
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  });

  it('Testa se GET /teams/:id retorna um time corretamente', async () => {
    sinon.stub(TeamsModelSequelize, 'findByPk').resolves(team as any);

    const result = await chai.request(app).get('/teams/1');

    const { body, status } = result;

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(team);
  });
});

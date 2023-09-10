import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { teams, team } from './Mocks/teamsMock';

import { app } from '../app';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do teams', () => {

  describe('GET /teams', () => {
    it('deve retornar todos os times corretamente', async () => {
      sinon.stub(TeamsModelSequelize, 'findAll').resolves(teams as any);

      const result = await chai.request(app).get('/teams');

      const { body, status } = result;

      expect(status).to.equal(200);
      expect(body).to.deep.equal(teams);
    });
  });

  describe('GET /teams/:id', () => {
    it('deve retornar um time corretamente', async () => {
      sinon.stub(TeamsModelSequelize, 'findByPk').resolves(team as any);

      const result = await chai.request(app).get('/teams/1');

      const { body, status } = result;

      expect(status).to.equal(200);
      expect(body).to.deep.equal(team);
    });
  });
});

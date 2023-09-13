import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import { mockOfMatches, create, resultcreate, error } from './Mocks/matchesMock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  it(' testa quando a rota GET /matches retorna lista de partidas', async () => {
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(mockOfMatches as any);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockOfMatches);
  });

  it(' testa quando a rota GET /matches?inProgress=false retorna lista de partidas em andamento', async () => {
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(mockOfMatches as any);

    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockOfMatches);
  });
  
  it(' testa quando é possivel atualizar o status de uma partida', async () => {
    sinon.stub(MatchesModelSequelize, 'update').resolves();
    sinon.stub(JWT, 'verify').returns('1234');

    const response = await chai.request(app).patch('/matches/1/finish').set('authorization', `Bearer 1234`)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });

  it(' testa quando é possivel realizar update de uma partida', async () => {
    sinon.stub(MatchesModelSequelize, 'update').resolves();
    sinon.stub(JWT, 'verify').returns('1234');

    const response = await chai.request(app).patch('/matches/1').set('authorization', `Bearer 1234`).send({ homeTeamScore: 1, awayTeamScore: 2 })

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'OK' });

  });

  it(' testa quando é falha ao tentar criar um time sem id no banco de dados', async () => {
    sinon.stub(MatchesModelSequelize, 'create').resolves(resultcreate as any);
    sinon.stub(JWT, 'verify').returns('1234');


    const response = await chai.request(app).post('/matches').set('authorization', `Bearer 1234`).send(create)

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({message: 'There is no team with such id!'});
  });

  it(' testa quando retorna erro ao tentar criar partida com times iguais', async () => {
    sinon.stub(MatchesModelSequelize, 'create').resolves(null as any);
    sinon.stub(JWT, 'verify').returns('1234');

    const response = await chai.request(app).post('/matches').set('authorization', `Bearer 1234`).send(error)

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  })

  it(' testa quando é possivel criar uma partida', async () => {
    sinon.stub(MatchesModelSequelize, 'create').resolves({dataValues: {id: 1}} as any);
    sinon.stub(JWT, 'verify').returns('1234');
    sinon.stub(MatchesModelSequelize, 'findByPk')
    .onFirstCall()
    .resolves({dataValues: {id: 16}} as any)
    .onSecondCall()
    .resolves({dataValues: {id: 8}} as any);

    const response = await chai.request(app).post('/matches').set('authorization', `Bearer 1234`).send(create)

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({id: 1});

  });

  afterEach(() => {
    sinon.restore();
  });

});

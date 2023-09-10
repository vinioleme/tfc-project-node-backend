import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModelSequelize from '../database/models/UsersModelSequelize';
import { tokenGen, successLogin, listOfLogin } from './Mocks/loginMock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Login', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve permitir o login com sucesso ao fazer uma requisição POST para /login', async () => {
    sinon.stub(UsersModelSequelize, 'findOne').resolves(listOfLogin as any);
    sinon.stub(JWT, 'sign').returns(tokenGen);

    const response = await chai.request(app).post('/login').send(successLogin);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ tokenGen });
  });

  it('Deve retornar um erro 400 ao fazer uma requisição POST para /login com um email em branco', async () => {
    const response = await chai.request(app).post('/login').send({ email: '' });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ message: 'Todos os campos devem ser preenchidos' });
  });

  it('Deve retornar um erro 401 ao fazer uma requisição POST para /login com um email inválido', async () => {
    sinon.stub(UsersModelSequelize, 'findOne').resolves(listOfLogin as any);

    const response = await chai.request(app).post('/login').send({ email: 'emailinvalido', password: '123456' });

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Email ou senha inválidos' });
  });

  it('Deve permitir uma requisição GET para /login/role quando autenticado', async () => {
    sinon.stub(UsersModelSequelize, 'findOne').resolves(listOfLogin as any);
    sinon.stub(JWT, 'verify').returns(tokenGen);

    const response = await chai.request(app).get('/login/role').set('authorization', `Bearer ${tokenGen}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ role: 'admin' });
  });
});

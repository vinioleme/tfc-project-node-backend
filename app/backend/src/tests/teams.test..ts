import * as sinon from 'sinon';
 import * as chai from 'chai';
 // @ts-ignore
 import chaiHttp = require('chai-http');
 import { allTeams } from './Mocks/Teams.mock';

 import { app } from '../app';
 import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
 import { Response } from 'superagent';

 chai.use(chaiHttp);
const { expect } = chai;
describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  // let chaiHttpResponse: Response;
  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });
  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })
  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...
   //   expect(...)
   // });

   it('Testa se o endpoin GET /teams retorna todos os times corretamente', async () => {
     sinon.stub(TeamsModelSequelize, 'findAll').resolves(allTeams as any);

     const result = await chai.request(app).get('/teams');

     const { body, status } = result;

     expect(status).to.be.equal(200);
     expect(body).to.be.deep.equal(allTeams);
   });
 });
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { HealthModule } from './health.module';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  test('GET / No carga pagina', () => {    
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });
});


describe('HealthService', () => {
  let service: HealthService;

  const valoresDeseados = {
    status: 'ok',
    uptime: expect.toBeGreaterThan(0),
    timestamp: expect.toBeDefined(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  test('probando funcion getStatus', () => {
    expect(service.getStatus()).toHaveProperty('status', 'ok');
    expect(service.getStatus()).toMatchObject(valoresDeseados);
  });  
})

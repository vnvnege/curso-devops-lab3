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
      .expect(404)
      .expect({status: 'ok'});
  });
});

/*
describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('Deberia mostrar resultado', () => {
    expect(service.operar('suma', 10, 50)).toBe(60);

    let a = 10;
    let b = 30;

    expect(service.operar('suma', a, b)).not.toBe(41);

    a = -100;
    b = 10;

    expect(service.operar('suma', a, b)).toBe(-90);
  });
})
  */
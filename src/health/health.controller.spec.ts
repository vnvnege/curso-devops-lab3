import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { HealthModule } from './health.module';



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

  test('GET / Tiempo transcurrido', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        const body = res.body;
        // status
        expect(body.status).toBe('ok');
        // uptime: número positivo mayor que 0
        expect(typeof body.uptime).toBe('number');
        expect(body.uptime).toBeGreaterThan(0);
        // timestamp: fecha válida
        expect(typeof body.timestamp).toBe('string');
        const parsedDate = new Date(body.timestamp);
        expect(parsedDate.toString()).not.toBe('Invalid Date');        
      });
  });
});
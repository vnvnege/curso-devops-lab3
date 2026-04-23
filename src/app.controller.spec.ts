import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from './app.module';
import request from 'supertest';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Probando la raiz del sitio', () => {
    it('probando funcion getHello"', () => {
      expect(appController.getHello()).toBe('Hello World!');
      expect(appController.getHello()).not.toBe('Hi there!!!');
    });
    it('probando funcion getSaludo"', () => {
      expect(appController.getSaludo()).toBe('Hola Mundo!');
    });
  });
});

describe('AppController (Via Rest)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200)
      .expect('Hello World!');
  });

  it('/GET', () => {
    return request(app.getHttpServer())
      .get('/saludo')
      .expect(200)
      .expect('Hola Mundo!');
  });
});


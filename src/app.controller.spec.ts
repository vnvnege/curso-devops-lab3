import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      expect(appController.getHello()).not.toBe('Hola Mundo!');
    });
    it('probando funcion getSaludo"', () => {
      expect(appController.getSaludo()).toBe('Hola Mundo!');
    });
  });
});

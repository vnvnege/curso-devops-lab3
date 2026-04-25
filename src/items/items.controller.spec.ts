import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { ItemsModule } from './items.module';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('encontrar todos', () => {
    expect(service.findAll()).toBeInstanceOf(Array);      
  });

  test('encontrar uno', () => {
    expect(service.findOne(1)).toHaveProperty('name', 'Item uno');
    expect(() =>
      service.findOne(3))
      .toThrow('Item 3 no encontrado',);
  });

  test('agregar caso 3', () => {
    expect(service.create('Item tres', 'Agregado por la prueba')).toHaveProperty('id', 3);      
  });

  test('borrar caso 2', () => {
    expect(service.remove(2)).toBeUndefined();
    expect(() =>
      service.findOne(2))
      .toThrow('Item 2 no encontrado',);
  });

});

describe('ItemsController', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ItemsModule],
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
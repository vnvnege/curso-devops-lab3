//import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
//import request from 'supertest';
//import { App } from 'supertest/types';
//import { ItemsModule } from './items.module';
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
    const caso1 = { id: 1, name: 'Item uno', description: 'Primer ejemplo de item' };
    expect(service.findAll()[0]).arrayContaining(caso1);
    //expect(service.findAll()).toHaveProperty('name');
    //expect(service.findAll()).toHaveProperty('description');    
  });

  /*

  test('encontrar el primer valor', () => {
    expect(service.findOne(1)).toHaveProperty('name', 'Item uno');
  });

  test('creando registro 3', () => {
    expect(service.create('el item tres', 'tercer valor')).toHaveReturned();
    expect(service.findOne(3)).toHaveProperty('name', 'el item tres');
  });

  test('borrando registro 3', () => {
    expect(service.remove(3)).toHaveReturned();
    expect(service.findOne(3)).toBeNaN();
  });
})

*/

/*

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

  test('GET / Pagina que no abre', () => {    
    return request(app.getHttpServer())
      .get('')
      .expect(404);
  });

  */
});


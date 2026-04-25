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
      
  });

});


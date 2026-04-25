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
    expect(service.findAll()).toBeInstanceOf(Array);      
  });

  test('encontrar uno', () => {
    expect(service.findOne(1)).toHaveProperty('name', 'Item uno');
    expect(service.findOne(3)).toBe('Item 3 no encontrado'); 
  });

  test('agregar caso 3', () => {
    expect(service.create('Item tres', 'Agregado por la prueba')).toHaveProperty('id', 3);      
  });

  test('borrar caso 3', () => {
    expect(service.remove(3)).toBeNull();
    expect(service.findOne(3)).toBe('Item 3 not found'); 
  });

});


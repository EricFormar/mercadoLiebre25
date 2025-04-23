import { describe, test, expect, beforeEach, vi } from 'vitest';
import request from 'supertest'
import express from 'express'
import { getAllProducts } from './productsApiController';
import db from '../../database/models'
describe('productsApiController', () => {
    let app
  
    beforeEach(() => {
      app = express()
      app.use(express.json())
      app.get('/api/products', getAllProducts)
    })

  test('should return all products', async () => {
    // Create some test products
    const mockProducts = [
      {name: 'Product 1', price: 10},
      {name: 'Product 2', price: 20},
      {name: 'Product 3', price: 30},
    ]
    
    vi.spyOn(db.Product, 'findAll').mockResolvedValue(mockProducts);

    const response = await request(app)
      .get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual(mockProducts)
    expect(db.Product.findAll).toHaveBeenCalled()
  })
})
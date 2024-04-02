import supertest from 'supertest'
import { app, server } from '../index'
const base = { Authorization: '', 'Content-Type': 'application/json' }

describe('product', () => {
  beforeAll(async () => {
    return new Promise((resolve) => {
      // Login Test User
      const payload = {
        email: 'ravi1235@yopmail.com',
        password: 'Qwerty@123',
      }
      supertest(app)
        .post(`/v1/user/login`)
        .send(payload)
        .then((res) => {
          expect(res.statusCode).toBe(200)
          base.Authorization = res.body.data.token
          resolve(true)
        })
    })
  })

  afterAll(async () => {
    //close server connection
    return new Promise((resolve) => {
      server.close()
      resolve(true)
    })
  })

  let productId: string

  /* Create a products */
  describe('Create a product', () => {
    it('should return a 200 status and a product', async () => {
      const bodyObj = {
        name: 'S23',
        description: 'samsung',
        price: '32000',
      }
      const { body, statusCode } = await supertest(app).post(`/v1/product/`).set(base).send(bodyObj)
      expect(statusCode).toBe(200)
      expect(body.data.name).toBe('S23')
      productId = body.data.id
    })
  })

  /* Get products list */
  describe('Get product list', () => {
    it('should return a 200 status and the product list', async () => {
      const params = '?limit=1&page=1&sortBy=createdAt&sort=-1'
      const { body, statusCode } = await supertest(app).get(`/v1/product/${params}`).set(base)

      expect(statusCode).toBe(200)
      expect(body.data.length).toBeGreaterThan(0)
    })
  })

  /* Update products list */
  describe('Update a product', () => {
    it('should return a 200 status and update the product', async () => {
      const bodyObj = {
        name: 'V23',
        description: 'vivo',
        price: '30000',
      }
      const { body, statusCode } = await supertest(app).put(`/v1/product/${productId}`).set(base).send(bodyObj)
      expect(statusCode).toBe(200)
      expect(body.data.name).toBe('V23')
    })
  })

  /* Delete products list */
  describe('Delete a product', () => {
    it('should return a 200 status and update the product', async () => {
      const { body, statusCode } = await supertest(app).delete(`/v1/product/${productId}`).set(base)
      expect(statusCode).toBe(200)
      expect(body.data.isDeleted).toBe(true)
    })
  })
})

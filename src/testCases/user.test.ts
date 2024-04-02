import supertest from 'supertest'
import { app, server } from '../index'
const base = { Authorization: '', 'Content-Type': 'application/json' }

describe('user', () => {
  //   beforeAll(async () => {
  //     return new Promise((resolve) => {
  //       // Login Test User
  //       const payload = {
  //         email: 'ravi1235@yopmail.com',
  //         password: 'Qwerty@123',
  //       }
  //       supertest(app)
  //         .post(`/v1/user/login`)
  //         .send(payload)
  //         .then((res) => {
  //           expect(res.statusCode).toBe(200)
  //           base.Authorization = res.body.data.token
  //           resolve(true)
  //         })
  //     })
  //   })

  afterAll(async () => {
    //close server connection
    return new Promise((resolve) => {
      server.close()
      resolve(true)
    })
  })

  let userId: string

  /* Users Signup */
  describe('User signUp', () => {
    it('should return a 200 status and a user', async () => {
      const bodyObj = {
        name: 'Ravi Varma',
        age: '35',
        email: 'raviVarma23@yopmail.com',
        password: 'Qwerty@123',
      }
      const { body, statusCode } = await supertest(app).post(`/v1/user/signUp`).set(base).send(bodyObj)
      expect(statusCode).toBe(200)
      expect(body.data.name).toBe('Ravi Varma')
      userId = body.data.id
    })
  })

  /* User login  */
  describe('User login', () => {
    it('should return a 200 status and the user', async () => {
      const payload = {
        email: 'ravi1235@yopmail.com',
        password: 'Qwerty@123',
      }
      const { body, statusCode } = await supertest(app).post(`/v1/user/login`).set(base).send(payload)

      expect(statusCode).toBe(200)
      expect(body.data.email).toBe('ravi1235@yopmail.com')
      base.Authorization = body.data.token
    })
  })

  /* Get users list */
  describe('Get user list', () => {
    it('should return a 200 status and the user list', async () => {
      const params = '?limit=1&page=1&sortBy=createdAt&sort=-1'
      const { body, statusCode } = await supertest(app).get(`/v1/user/${params}`).set(base)

      expect(statusCode).toBe(200)
      expect(body.data.length).toBeGreaterThan(0)
    })
  })

  /* Update users list */
  describe('Update a user', () => {
    it('should return a 200 status and update the user', async () => {
      const bodyObj = {
        name: 'Shami Pathan',
        age: '38',
      }
      const { body, statusCode } = await supertest(app).put(`/v1/user/${userId}`).set(base).send(bodyObj)
      expect(statusCode).toBe(200)
      expect(body.data.name).toBe('Shami Pathan')
    })
  })

  //   /* Delete users list */
  describe('Delete a user', () => {
    it('should return a 200 status and update the user', async () => {
      const { body, statusCode } = await supertest(app).delete(`/v1/user/${userId}`).set(base)
      expect(statusCode).toBe(200)
      expect(body.data.isDeleted).toBe(true)
    })
  })
})

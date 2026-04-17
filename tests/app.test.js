const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from Node.js CI/CD App!');
    expect(res.body.status).toBe('running');
  });
});

describe('GET /health', () => {
  it('should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('GET /add', () => {
  it('should add two numbers', async () => {
    const res = await request(app).get('/add?a=5&b=3');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
  });

  it('should return 400 if params missing', async () => {
    const res = await request(app).get('/add');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe('POST /greet', () => {
  it('should return greeting message', async () => {
    const res = await request(app)
      .post('/greet')
      .send({ name: 'Jenkins' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, Jenkins!');
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app).post('/greet').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

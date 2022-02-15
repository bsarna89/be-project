const request = require('supertest');
const app = require('../notes');
const db = require('../db/connection');
const data = require('../db/index');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(data));

afterAll(() => {
    if (db.end) db.end();
});





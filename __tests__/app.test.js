const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const data = require('../db/index');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(data));

afterAll(() => {
    if (db.end) db.end();
});

xdescribe('/api/topics', () => {
    describe('GET topics', () => {
        test('/api/topics returns array of objects, should have slug and description property ', () => {
            return request(app).get('/api/topics').expect(200).then((response) => {

                expect(response.body.topics).toBeInstanceOf(Array);
                expect(response.body.topics.length).toBeGreaterThan(0);

                response.body.topics.forEach((topic) => {
                    expect(topic).toEqual(expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    }))
                })


            })

        })

        test('/api/topics responds error 404 when wrong path been passed ', () => {
            return request(app).get('/api/topic').expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })


    });

});

xdescribe('/api/articles/:article_id', () => {
    describe('GET article_id', () => {
        test('/api/articles/:article_id,responds 200 with one element array containing article  ', () => {
            return request(app).get('/api/articles/2').expect(200).then((response) => {

                expect(response.body.article).toBeInstanceOf(Array);
                expect(response.body.article.length).toBe(1);

                response.body.article.forEach((article) => {
                    expect(article).toEqual(expect.objectContaining({
                        article_id: expect.any(Number),
                        votes: expect.any(Number),
                        title: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        topic: expect.any(String)
                    }))
                })

            })

        })

        test('/api/articles/article:id responds error 404 when wrong path been passed ', () => {
            return request(app).get('/api/tarticless').expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id responds error 404 when article_id does not exist in DB', () => {
            return request(app).get('/api/articles/1234').expect(404).then((response) => {

                const message = { msg: "Resource not found" };
                expect(response.body).toEqual(message);
            })

        })
        test('/api/articles/article:id responds error 400 when article_id is not valid', () => {
            return request(app).get('/api/articles/ban').expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })
    });

});

describe('/api/users', () => {
    describe('GET users', () => {
        test('/api/users returns array of objects, should username property ', () => {
            return request(app).get('/api/users').expect(200).then((response) => {

                expect(response.body.users).toBeInstanceOf(Array);
                expect(response.body.users.length).toBeGreaterThan(0);

                response.body.users.forEach((user) => {
                    expect(user).toEqual(expect.objectContaining({
                        username: expect.any(String)

                    }))
                })

            })

        })

        test('/api/users responds error 404 when wrong path been passed ', () => {
            return request(app).get('/api/user').expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })

    });

});
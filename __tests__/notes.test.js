const request = require('supertest');
const app = require('../notes');
const db = require('../db/connection');
const data = require('../db/index');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(data));

afterAll(() => {
    if (db.end) db.end();
});




describe('Notes', () => {

    describe('GET Notes', () => {
        test('/api/articles ', () => {
            return request(app).get('/api/articles').expect(200).then((response) => {

                expect(response.body.articles).toBeInstanceOf(Array);
                expect(response.body.articles.length).toBeGreaterThan(0);

                response.body.articles.forEach((article) => {
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

        test('/api/topics responds error 404 when wrong path been passed ', () => {
            return request(app).get('/api/article').expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })


    });

});
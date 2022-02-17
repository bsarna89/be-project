const request = require('supertest');
const app = require('../notes');
const db = require('../db/connection');
const data = require('../db/index');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(data));

afterAll(() => {
    if (db.end) db.end();
});

describe('/api/articles', () => {

    describe('GET articles', () => {
        test('/api/articles returns array of objects, should have required set of properties ', () => {
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

        test('/api/articles responds with sorted array of articles sorted by date in descending order ', () => {
            return request(app).get('/api/articles').expect(200).then((response) => {

                expect(response.body.articles).toBeSortedBy("created_at", { descending: true });
            })

        })


        test('/api/articles responds error 404 when wrong path been passed ', () => {
            return request(app).get('/api/article?comment_count').expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })

        test.only('Trials ', () => {
            return request(app).get('/api/articles?comment_count').expect(200).then((response) => {


                console.log(response.body, "GETTING");

            })

        })


    });

});



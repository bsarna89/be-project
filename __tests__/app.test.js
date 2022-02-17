const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const data = require('../db/index');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(data));

afterAll(() => {
    if (db.end) db.end();
});




describe('/api/topics', () => {

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


describe('/api/articles/:article_id', () => {
    describe('GET by article_id + query', () => {

        test('/api/articles/:article_id,responds 200 with one element array containing article  ', () => {
            return request(app).get('/api/articles/2').expect(200).then((response) => {


                expect(response.body.article).toEqual(expect.objectContaining({
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

        test('/api/articles/article:id?comment_count responds 200 wth object ', () => {
            return request(app).get('/api/articles/1?comment_count').expect(200).then((response) => {

                expect(response.body.article).toEqual(expect.objectContaining({
                    article_id: 1,
                    comment_count: 11,
                    votes: expect.any(Number),
                    title: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    topic: expect.any(String)
                }))


            })

        })
        test('/api/articles/article:id?comment_count responds error 404 when article_id does not exist in DB and query passed', () => {
            return request(app).get('/api/articles/1234?comment_count').expect(404).then((response) => {

                const message = { msg: "Resource not found" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id?commet_count responds error 400 when article_id is not valid and query passed', () => {
            return request(app).get('/api/articles/ban?comment_count').expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })
        test('/api/articles/article:id?commet_count responds error 400 when query is not valid', () => {
            return request(app).get('/api/articles/1?trash=1').expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })



    });

});

describe('/api/users', () => {
    describe('GET users', () => {
        test('/api/users returns array of objects, should have username property ', () => {
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
            return request(app).get('/api/article').expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })


    });

});

describe('/api/articles/:article_id', () => {
    describe('PATCH on article_id', () => {

        const updateArticle =
        {
            inc_votes: 23
        }

        test('/api/articles/:article_id,responds 200 with updated article  ', () => {



            return request(app).patch('/api/articles/1').send(updateArticle).expect(200).then((response) => {

                expect(response.body.article).toEqual(expect.objectContaining({
                    article_id: 1,
                    votes: 123,
                    title: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    topic: expect.any(String)
                }))

            })

        })

        test('/api/articles/article:id responds error 404 when wrong path been passed ', () => {
            return request(app).patch('/api/tarticless').send(updateArticle).expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })


        test('/api/articles/article:id responds error 404 when article_id does not exist in DB', () => {
            return request(app).patch('/api/articles/1234').send(updateArticle).expect(404).then((response) => {

                const message = { msg: "Resource not found" };
                expect(response.body).toEqual(message);
            })

        })
        test('/api/articles/article:id responds error 400 when article_id is not valid', () => {
            return request(app).patch('/api/articles/id').send(updateArticle).expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id responds error 400 when passed body.inc_votes is not valid', () => {
            return request(app).patch('/api/articles/1').send({ inc_votes: "id" }).expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })
        test('/api/articles/article:id responds error 400 when passed body is empty', () => {
            return request(app).patch('/api/articles/1').send({}).expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id responds with 400 when passed body has more then one property', () => {
            return request(app).patch('/api/articles/1').send({ inc_votes: 23, user: "alan" }).expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })

    });

});

describe('/api/articles/:article_id/comments', () => {
    describe('POST comment', () => {

        const insertObject =
        {
            username: 'icellusedkars',
            body: 'I love coding...:)'
        }

        test('/api/articles/:articleid/comments returns posted object ', () => {
            return request(app).post('/api/articles/1/comments').send(insertObject).expect(200).then((response) => {

                expect(response.body.comment).toEqual(expect.objectContaining({
                    comment_id: expect.any(Number),
                    votes: 0,
                    author: 'icellusedkars',
                    body: 'I love coding...:)',
                    created_at: expect.any(String),
                    article_id: 1
                }))

            })

        })

        test('/api/articles/article:id/comments responds error 404 when wrong path been passed ', () => {
            return request(app).post('/api/articles/2/comment').send(insertObject).expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id/comments responds error 400 when article_id is not valid ', () => {
            return request(app).post('/api/articles/id/comments').send(insertObject).expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id/comments responds error 400 when article_id does not exist in DB ', () => {
            return request(app).post('/api/articles/1234/comments').send(insertObject).expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id/comments responds error 400 when passed body is empty ', () => {
            return request(app).post('/api/articles/1/comments').send({}).expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id/comments responds error 400 when passed body has more then two properties ', () => {
            return request(app).post('/api/articles/1/comments').send({ body: "Loving", username: "alan", num: 23 }).expect(400)
                .then((response) => {

                    const message = { msg: "Bad Request" };
                    expect(response.body).toEqual(message);
                })

        })

        test('/api/articles/article:id/comments responds error 400 when passed body has only one property ', () => {
            return request(app).post('/api/articles/1/comments').send({ body: "Loving" }).expect(400)
                .then((response) => {

                    const message = { msg: "Bad Request" };
                    expect(response.body).toEqual(message);
                })

        })

        test('/api/articles/article:id/comments responds error 400 when object.username it is not String ', () => {
            return request(app).post('/api/articles/1/comments').send({ body: "Loving", username: 2 }).expect(400)
                .then((response) => {

                    const message = { msg: "Bad Request" };
                    expect(response.body).toEqual(message);
                })

        })
        test('/api/articles/article:id/comments responds error 400 when object.body it is not String ', () => {
            return request(app).post('/api/articles/1/comments').send({ body: 2, username: "alan" }).expect(400)
                .then((response) => {

                    const message = { msg: "Bad Request" };
                    expect(response.body).toEqual(message);
                })

        })


    });

});

describe('/api/comments/:comment_id', () => {

    describe('DELETE comment', () => {
        test('/api/comments/:comment_id responds 204 and delete comment ', () => {
            return request(app).delete('/api/comments/1').expect(204).then((response) => {

                //will be done when /api/get/comments created
                /*
                return request(app).get("/api/comments").expect(200).then(({ response }) => {
                    expect(response.comments).toHaveLength(lastComments);
                });
                */

            })

        })

        test('/api/comments/:comment_id responds error 404 when wrong path been passed ', () => {
            return request(app).delete('/api/comment/2').expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/comments/:comment_id responds error 404 when comment_id does not exist in DB', () => {
            return request(app).delete('/api/comments/1234').expect(404).then((response) => {

                const message = { msg: "Resource not found" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/comments/:comment_id responds error 400 when commit_id is not valid', () => {
            return request(app).delete('/api/comments/id').expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })
    });

});

describe('/api/articles/:article_id/comments', () => {
    describe('GET comments by article_id', () => {

        test('/api/articles/:article_id/comments responds 200 with array of comments to article  ', () => {
            return request(app).get('/api/articles/3/comments').expect(200).then((response) => {


                expect(response.body.comments).toBeInstanceOf(Array);

                expect(response.body.comments.length).toBe(2);

                response.body.comments.forEach((comment) => {
                    expect(comment).toEqual(expect.objectContaining({

                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        author: expect.any(String)
                    }))
                })

            })

        })

        test('/api/articles/article:id/comments responds error 404 when wrong path been passed ', () => {
            return request(app).get('/api/articles/3/comment').expect(404).then((response) => {

                const message = { msg: "Path not found" };
                expect(response.body).toEqual(message);
            })

        })


        test('/api/articles/article:id/comments responds error 404 when article_id does not exist in DB', () => {
            return request(app).get('/api/articles/1234/comments').expect(404).then((response) => {

                const message = { msg: "Resource not found" };
                expect(response.body).toEqual(message);
            })

        })
        test('/api/articles/article:id/comments responds error 404 when article has not been commented', () => {
            return request(app).get('/api/articles/2/comments').expect(404).then((response) => {

                const message = { msg: "Resource not found" };
                expect(response.body).toEqual(message);
            })

        })

        test('/api/articles/article:id/comments responds error 400 when article_id is not valid', () => {
            return request(app).get('/api/articles/id/comments').expect(400).then((response) => {

                const message = { msg: "Bad Request" };
                expect(response.body).toEqual(message);
            })

        })
    });

});
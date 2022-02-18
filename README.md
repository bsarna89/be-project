# NC NEWS API - Back End


An API for accessing and contributing to the latest development.

## Getting Started

These instructions will get the project functioning locally to facilitate development and testing. For details on how to deploy the project on a live system, please refer to the deployment notes.

## _Prerequisites_

It is assumed that the following packages are already globally installed:

| Dependency | Version |
| ---------- | ------- |
| PostgreSQL | 10.8    |
| Node.JS    | v17.2.0 |
| NPM        | 8.1.4   |

The following dependencies will also be installed as part of the below installation process:

| Dependency    |
| ------------- |
| express       |
| node Postgres |
| JEST          |
| supertest     |
| dotenv        |
| pg            |
| pg-format     |

## _Installing_

This section details the steps required in order to run the development environment.

After forking this repository, clone its contents to your local system by using the following terminal command:

```
$ git clone https://github.com/<your-github-username>/be-nc-news
```

Please note that the `development` and `test` connection objects will only require your postgreSQL username and password if you are running a linux system. If you are running Mac OSX, you may remove the username and password keys from these objects.

Subsequently, the following terminal commands must be run in order to set up your local test and development databases:

```
$ npm install

$ npm run setup-dbs

$ npm run seed

```

After following these steps, the databases will be in place and you will be able to access the test database by running the following commands in your terminal:

```
$ psql
\c nc_news_test
```

Now select any details you wish to access. For example:

```
nc_news_test=# SELECT * FROM users;
```

To return to your terminal command prompt, type `\q`.

Alternatively, you will be able to start a local server in order to access the respective endpoints directly. This will be achieved by running the command:

```
$ npm run listen.js
```

In your preferred browser, simply navigate to http://localhost:9090/api in order to view the valid endpoints. Other requests, such as POST or PATCH requests, may be replicated using a REST client such as Insomnia.

## After Installation

After successfully installing the various dependencies and running the initial scripts, you will be free to explore and alter the project as you see fit. Please note that a substantive test suite has been provided with this repository, which may be utilised or amended as appropriate.

## _Running the Tests_

The test suite included with this repository contains various tests to ensure each endpoint functions as intended. Upon making any alterations, the complete test suite may be run using the following command:

```
$ npm test
```

The following table outlines the purpose of each category of tests. Should you require additional details, please review the tests themselves in the `app.spec.js` file.

| Endpoint                           | Request | Tests                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api                               | GET     | Ensures that a JSON detailing the available endpoints and the requirements within each in served upon receiving a request.                                                                                                                                                                                                                              |
| /api/topics                        | GET     | Ensures that all topics are served. These are served as an array of each topic.                                                                                                                                                                                                                                                                                                               |
| /api/users                         | GET     | Ensures that all users are served. These are served as an array of users.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| /api/articles                      | GET     | Ensures that all articles are served in an array. Also ensures that the 6 valid queries (sort-by, order, author, topic, limit and page) function as intended, returning an error if an invalid value is provided, or a page requested that does not exist.                                                                                                                                                                                                                                                                                                                    |
| /api/articles/:article_id          | GET     | Ensures that the correct article is displayed. An error is returned if the requested article ID does not exist or a non-integer is entered.                                                                                                                                                                                                             |
| /api/articles/:article_id          | PATCH   | Ensures that the requested changes are made to the article's vote property, serving the updated article. If additional keys are provided, they are ignored and an error is returned if a non-integer is entered as the value of inc_votes.                                                                                                                                                                                                                                                                                                 |
| /api/articles/:article_id/comments | GET     | Ensures that all comments from the specified article are served. An error is returned if the requested article ID does not exist or a non-integer is entered. Also ensures that the 4 valid queries (sort-by, order, limit and page) function as intended, returning an error if an invalid value is provided, or a page requested that does not exist. |
| /api/articles/:article_id/comments | POST    | Ensures that a new comment is posted to the specified article, serving the complete new comment. Ensures an error is returned if an invalid or non-existent article ID is entered. Also ensures that an error is returned if insufficient data is received in the body of the request                                                                                                                                                             |
| /api/comments/:comment_id          | DELETE  | Ensures the specified comment is deleted and that an error is returned if the specified comment does not exist or a non-integer is entered                                                                                                                                                                                                              |

## Deployment

Providing you have accurately followed the above steps, the repository will be ready for deployment to a live system using a production database.


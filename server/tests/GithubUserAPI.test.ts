import { describe, test, before, after, beforeEach } from 'node:test';
import { db } from '../database';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app';
import { GithubUserRepository } from '../repositories/GithubUserRepository';
import { IncomingHttpHeaders } from 'node:http2';
import { NewGithubUser } from '../models/GithubUser';

const browser = supertest.agent(app);

describe('when there are no users initially saved', { skip: 'API endpoint currently unnecessary due to Passport' } , () => {
    before(async () => {
        await db.schema.createTable('githubUser')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.primaryKey())
            .addColumn('username', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('githubID', 'varchar(50)', (col) => col.notNull().unique())
            .execute();
    });

    beforeEach(async () => {
        await GithubUserRepository.deleteAll();
    });

    describe('new user creation succeeds', () => {
        test('with id not provided', async () => {
            //ID will be created on the server
            const newUser : NewGithubUser = {
                username: 'sarah1',
                githubID: '123'
            };

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken : IncomingHttpHeaders = { 'x-csrf-token': csrfResponse.body.token }

            const createdUser = await browser
                .post('/api/users')
                .set(csrfToken)
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const userAtLocation = await browser
                .get(`/api/users/${newUser.username}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            assert.deepStrictEqual(createdUser.body, userAtLocation.body);
        });

        test('with id provided but replaced by the server', async () => {
            //ID will be created on the server
            const newUser : NewGithubUser = {
                id: crypto.randomUUID(),
                username: 'sarah1',
                githubID: '123'
            };

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken : IncomingHttpHeaders = { 'x-csrf-token': csrfResponse.body.token }

            const createdUser = await browser
                .post('/api/users')
                .set(csrfToken)
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const userAtLocation = await browser
                .get(`/api/users/${newUser.username}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            assert.deepStrictEqual(createdUser.body, userAtLocation.body);
            assert.ok(!createdUser.body.id);
        });
    });

    after(async () => {
        await db.schema.dropTable('githubUser').execute();
    });
});
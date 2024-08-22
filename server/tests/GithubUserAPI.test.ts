import { describe, test, before, after, beforeEach } from 'node:test';
import { db } from '../database';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app';
import { GithubUserRepository } from '../repositories/GithubUserRepository';
import { usersService } from '../services/users';
import { NewGithubUser } from '../models/GithubUser';

const browser = supertest.agent(app);

//Test can be flakey... going to figure out a way to properly order all test suites which require database access.
describe('when there are users initially saved', () => {
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

    test('user retrieval successfully returns user data without database ID', async () => {
        //ID will be created on the server
        const newUser : NewGithubUser = {
            username: 'sarah1',
            githubID: '123'
        };

        const createdUser = await usersService.createUser(newUser);

        const userAtLocation = await browser
            .get(`/api/users/${newUser.username}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.deepStrictEqual(createdUser?.username, userAtLocation.body.username);
        assert.deepStrictEqual(createdUser?.githubID, userAtLocation.body.githubID);
        assert.ok(!userAtLocation.body.id);
    });

    after(async () => {
        await db.schema.dropTable('githubUser').execute();
    });
});
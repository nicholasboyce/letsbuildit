import { describe, test, before, after, beforeEach } from 'node:test';
import { db } from '../database';
import assert from 'node:assert';
import app from '../app';
import { GithubUser, NewGithubUser } from '../models/GithubUser';
import { createUser, findUserById, deleteAll } from '../repositories/GithubUserRepository';

describe('Github Repository', () => {
    before(async () => {
        await db.schema.createTable('githubUser')
            .ifNotExists()
            .addColumn('id', 'serial', (col) => col.primaryKey())
            .addColumn('username', 'varchar(50)', (col) => col.notNull())
            .addColumn('githubID', 'integer', (col) => col.notNull())
            .execute();
    });

    beforeEach(async () => {
        await deleteAll();
    });

    test('successfully creates new user', async () => {
        const newUser : NewGithubUser = {
            username: 'sarah1',
            githubID: 123
        };

        const user = await createUser(newUser);

        assert.ok(user.id);
        console.log(user.id);
        assert.strictEqual(newUser.username, user.username);
        assert.strictEqual(newUser.githubID, user.githubID);

        const result = await findUserById(user.id);

        assert.deepStrictEqual(user, result);
    });

    after(async () => {
        await db.schema.dropTable('githubUser').execute();
    })
});
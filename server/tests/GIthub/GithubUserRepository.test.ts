import { describe, test, before, after, beforeEach } from 'node:test';
import { db } from '../../database';
import assert from 'node:assert';
import { NewGithubUser } from '../../models/GithubUser';
import { GithubUserRepository } from '../../repositories/GithubUserRepository';
import crypto from 'node:crypto';
const { createUser, findUserById, deleteAll, updateUser } = GithubUserRepository;

describe('GithubUser Repository', () => {
    before(async () => {
        await db.schema.createTable('githubUser')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.primaryKey())
            .addColumn('username', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('githubID', 'varchar(50)', (col) => col.notNull().unique())
            .execute();
        console.log('Starting Repo Test');
    });

    beforeEach(async () => {
        await deleteAll();
    });

    test('successfully creates new user', async () => {
        const newUser : NewGithubUser = {
            id: crypto.randomUUID(),
            username: 'sarah2',
            githubID: '1234'
        };

        const user = await createUser(newUser);

        assert.strictEqual(newUser.username, user.username);
        assert.strictEqual(newUser.githubID, user.githubID);

        const result = await findUserById(user.id);

        assert.deepStrictEqual(user, result);
    });

    test('successfully updates existing user', async () => {
        const newUser : NewGithubUser = {
            id: crypto.randomUUID(),
            username: 'sarah2',
            githubID: '1234'
        };

        const user = await createUser(newUser);
        const updatedUser = await updateUser(user.id, { username: 'sarahBEARA' });

        assert.strictEqual(updatedUser.username, 'sarahBEARA');

        const storedUser = await findUserById(user.id);
        assert.deepStrictEqual(storedUser, updatedUser);
    });

    after(async () => {
        await db.schema.dropTable('githubUser').execute();
    });
});
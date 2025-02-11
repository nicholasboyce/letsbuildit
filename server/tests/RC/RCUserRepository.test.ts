import { describe, test, before, after, beforeEach } from 'node:test';
import { db } from '../../database';
import assert from 'node:assert';
import { NewRCUser } from '../../models/RCUser';
import { RCUserRepository } from '../../repositories/RCUserRepository';
import crypto from 'node:crypto';
const { createUser, findUserById, deleteAll, updateUser } = RCUserRepository;

describe('RCUser Repository', () => {
    before(async () => {
        await db.schema.createTable('rcUser')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.primaryKey())
            .addColumn('username', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('rcID', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('refreshToken', 'varchar(50)', (col) => col.notNull().unique())
            .execute();
        console.log('Starting Repo Test');
    });

    beforeEach(async () => {
        await deleteAll();
    });

    test('successfully creates new user', async () => {
        const newUser : NewRCUser = {
            id: crypto.randomUUID(),
            username: 'sarah2',
            rcID: '1234',
            refreshToken: 'token'
        };

        const user = await createUser(newUser);

        assert.strictEqual(newUser.username, user.username);
        assert.strictEqual(newUser.rcID, user.rcID);

        const result = await findUserById(user.id);

        assert.deepStrictEqual(user, result);
    });

    test('successfully updates existing user', async () => {
        const newUser : NewRCUser = {
            id: crypto.randomUUID(),
            username: 'sarah2',
            rcID: '1234',
            refreshToken: 'token'
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
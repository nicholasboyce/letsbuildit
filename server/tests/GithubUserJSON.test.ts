import { describe, test } from 'node:test';
import assert from 'node:assert';
import app from '../app';
import { NewGithubUser } from '../models/GithubUser';


describe('GithubUser object', () => {
    test('serializes and deserializes successfully', () => {
        const newUser : NewGithubUser = {
            username: 'sarah1',
            githubID: 123
        };

        const serialized = JSON.stringify(newUser);
        const deserialized : NewGithubUser = JSON.parse(serialized);

        assert.deepStrictEqual(newUser, deserialized);
        assert.strictEqual(newUser.username, deserialized.username);
        assert.strictEqual(newUser.githubID, deserialized.githubID);
    });
});
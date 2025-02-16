import { describe, test, before, after, beforeEach } from 'node:test';
import { db } from '../../database';
import assert from 'node:assert';
import { RCUserRepository } from '../../repositories/RCUserRepository';
import { NewRCUser } from '../../models/RCUser';
import { z } from 'zod';
import { MockAgent, setGlobalDispatcher } from 'undici';
import { rcProfileResponse } from '../../utils/recurse';
import { usersService } from '../../services/users';

const userPostResponseSchema = z.object({
    user: z.object({
        zulip_id: z.number(),
        image_path: z.string().url(),
        name: z.string(),
        pronouns: z.string()
    }),
    posts: z.array(
        z.object({
            html_url: z.string().url(),
            name: z.string(),
            full_name: z.string(),
            description: z.string(),
            created_at: z.date(),
            updated_at: z.date(),
            main_language: z.string().nullable(),
            languages: z.array(z.string().nullable())
        })
    )
});

const sarahRCData : rcProfileResponse = {
    zulip_id: 555777,
    image_path: 'https://www.github.com',
    name: 'Sarah Syrup',
    pronouns: 'she/her'
};

const sarahGHData = [{
    html_url: 'https://www.github.com',
    name: 'sarah_repo',
    full_name: 'sarah2/sarah_repo',
    description: "sarah's repo! lol",
    created_at: "2011-01-26T19:06:43Z",
    updated_at: "2011-01-26T19:06:43Z",
    plip: "lol",
    main_language: "Python",
    languages: ["Python"]
}];

describe('Service layer', () => {
    before(async () => {
        await db.schema.createTable('rc_user')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.primaryKey())
            .addColumn('name', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('rcID', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('rcRefreshToken', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('githubID', 'varchar(50)', (col) => col.unique())
            .addColumn('githubRefreshToken', 'varchar(50)', (col) => col.unique())
            .addColumn('githubName', 'varchar(50)', (col) => col.unique())
            .execute();
        console.log('Starting API Test');
    });

    beforeEach(async () => {
        await RCUserRepository.deleteAll();
    });

    describe('when a user already exists', () => {

        let newUser : NewRCUser;
        let agent : MockAgent;

        beforeEach(async () => {
            agent = new MockAgent();
            setGlobalDispatcher(agent);

            newUser = {
                id: crypto.randomUUID(),
                name: 'sarah2',
                rcID: '1234',
                rcRefreshToken: 'token',
                githubID: 'gho_1234',
                githubRefreshToken: 'ghu_token',
                githubName: 'sarah2'
            };
    
            const created = await RCUserRepository.createUser(newUser);
            assert.deepStrictEqual(newUser, created);
        });

        test('returns up to 30 most recent public repositories for specified user', async () => {
            agent
                .get(`https://www.recurse.com`)
                .intercept({
                    path: `/api/v1/profiles/${newUser.rcID}`,
                    method: 'GET'
                })
                .reply(200, sarahRCData);

            agent
                .get('https://api.github.com')
                .intercept({
                    path: `/users/${newUser.githubName}/repos`,
                    method: 'GET'
                })
                .reply(200, sarahGHData);
        
            const userData = await usersService.getUser(newUser.rcID, 'rc', 'github'); //tokens do not matter, API calls being mocked
            assert(userPostResponseSchema.safeParse(userData).success);
        });

        test('fails gracefully if only RC token returns 404', async () => {
            agent
                .get(`https://www.recurse.com`)
                .intercept({
                    path: `/api/v1/profiles/${newUser.rcID}`,
                    method: 'GET'
                })
                .reply(404, JSON.stringify({message: 'Not found'}));

            agent
                .get('https://api.github.com')
                .intercept({
                    path: `/users/${newUser.githubName}/repos`,
                    method: 'GET'
                })
                .reply(200, sarahGHData);

            const userData = await usersService.getUser(newUser.rcID, 'rc', 'github'); //tokens do not matter, API calls being mocked
            assert.strictEqual(userData, null);
            assert(!userPostResponseSchema.safeParse(userData).success);
        });

        test('fails gracefully if only Github call returns 404', async () => {
            agent
                .get(`https://www.recurse.com`)
                .intercept({
                    path: `/api/v1/profiles/${newUser.rcID}`,
                    method: 'GET'
                })
                .reply(200, sarahRCData);

            agent
                .get('https://api.github.com')
                .intercept({
                    path: `/users/${newUser.githubName}/repos`,
                    method: 'GET'
                })
                .reply(404, JSON.stringify({message: 'Not found'}));

            const userData = await usersService.getUser(newUser.rcID, 'rc', 'github'); //tokens do not matter, API calls being mocked
            assert.strictEqual(userData, null);
            assert(!userPostResponseSchema.safeParse(userData).success);
        });

        test('fails gracefully if either call replies with error', async () => {
            agent
                .get(`https://www.recurse.com`)
                .intercept({
                    path: `/api/v1/profiles/${newUser.rcID}`,
                    method: 'GET'
                })
                .replyWithError(new Error('Not found'));

            agent
                .get('https://api.github.com')
                .intercept({
                    path: `/users/${newUser.githubName}/repos`,
                    method: 'GET'
                })
                .replyWithError(new Error('Not found'));

            const userData = await usersService.getUser(newUser.rcID, 'rc', 'github'); //tokens do not matter, API calls being mocked
            assert.strictEqual(userData, null);
            assert(!userPostResponseSchema.safeParse(userData).success);
        });

        after(async () => {
            await RCUserRepository.deleteAll();
        });

    });
});
import { describe, test, before, after, beforeEach } from 'node:test';
import { db } from '../../database';
import assert, { strictEqual } from 'node:assert';
import supertest from 'supertest';
import app from '../../app';
import { RCUserRepository } from '../../repositories/RCUserRepository';
import { NewRCUser } from '../../models/RCUser';
import { z } from 'zod';

const browser = supertest.agent(app);

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
            main_language: z.string(),
            languages: z.array(z.string())
        })
    )
});


describe('API', () => {
    before(async () => {
        await db.schema.createTable('rc_user')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) => col.primaryKey())
            .addColumn('name', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('rcID', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('rcRefreshToken', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('githubID', 'varchar(50)', (col) => col.unique())
            .addColumn('githubRefreshToken', 'varchar(50)', (col) => col.unique())
            .execute();
        console.log('Starting Repo Test');
    });

    beforeEach(async () => {
        await RCUserRepository.deleteAll();
    });

    describe('when a user already exists', () => {

        let newUser : NewRCUser;

        before(async () => {
            newUser = {
                id: crypto.randomUUID(),
                name: 'sarah2',
                rcID: '1234',
                rcRefreshToken: 'token',
                githubID: 'gho_1234',
                githubRefreshToken: 'ghu_token'
            };
    
            await RCUserRepository.createUser(newUser);
        });

        test('returns up to 30 most recent public repositories for specified user', async () => {
            const response = await browser
                .get(`/api/users/${newUser.rcID}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const userData = response.body;
            assert(userPostResponseSchema.safeParse(userData).success);
        });

    });
});
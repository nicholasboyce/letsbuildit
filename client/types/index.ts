import { z } from "zod";

const TeamMemberSchema = z.object({
    username: z.string(),
    manager: z.boolean()
});

const UserAccountSchema = z.object({
    username: z.string(),
    timezone: z.string()
});

const ProjectPostSchema = z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    account: UserAccountSchema,
    status: z.boolean(),
    created_at: z.string(), // want to roll this into id using Snowflake
    difficulty: z.string(),
    language: z.string(),
    upvotes: z.number(),
    repo_link: z.string().url(),
    team_members: z.array(TeamMemberSchema)
});

export interface ProjectPost extends z.infer<typeof ProjectPostSchema>{};
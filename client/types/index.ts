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
    id: z.string(),
    title: z.string(),
    body: z.string(),
    account: UserAccountSchema,
    open: z.boolean(),
    // created_at: z.string(), // want to roll this into id using Snowflake
    difficulty: z.number(), //change back to string, only number for compatibility with fake data
    language: z.string(),
    upvotes: z.number(),
    repo_link: z.string().url(),
    team_members: z.array(TeamMemberSchema)
});

export interface ProjectPost extends z.infer<typeof ProjectPostSchema>{};
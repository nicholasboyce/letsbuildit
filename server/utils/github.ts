import { z } from "zod";

const ghResponseSchema = z.object({
    html_url: z.string().url(),
    name: z.string(),
    full_name: z.string(),
    description: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    main_language: z.string(),
    languages: z.array(z.string())
}).array();

export interface ghResponse extends z.infer<typeof ghResponseSchema>{};

const getUserPosts = async (name: string | undefined, accessToken: string | undefined) => {
    if (!name) {
        return {
            success: false,
            data: null
        }
    }
    const response = await fetch(`https://api.github.com/users/${name}/repos`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github+json'
        }
    });
    const rawData = await response.json();
    // console.log(rawData);
    const posts = ghResponseSchema.safeParse(rawData);
    // console.log(posts.success);
    return posts;
};

export const github = {
    getUserPosts
};
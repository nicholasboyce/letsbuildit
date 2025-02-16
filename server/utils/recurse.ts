import { z } from "zod";

const rcProfileResponseSchema = z
    .object({
        zulip_id: z.number(),
        image_path: z.string().url(),
        name: z.string(),
        pronouns: z.string()
    });

export interface rcProfileResponse extends z.infer<typeof rcProfileResponseSchema>{};

const getUserInfo = async (id: string, accessToken: string | undefined) => {
    // if (!accessToken) {
    //     return {
    //         success: false,
    //         data: null
    //     }
    // }
    try {
        const userResponse = await fetch(`https://www.recurse.com/api/v1/profiles/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const userProfile = await userResponse.json();
        const userInfo = rcProfileResponseSchema.safeParse(userProfile);
        return userInfo;
    } catch (error) {
        return {
            success: false,
            error,
            data: null
        }
    }
};

export const recurse = {
    getUserInfo,
};
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
    const userResponse = await fetch(`https://www.recurse.com/api/v1/profiles/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const userProfile = await userResponse.json();
    // console.log(userProfile);
    const userInfo = rcProfileResponseSchema.safeParse(userProfile);
    // console.log(userInfo.success);
    return userInfo;
};

export const recurse = {
    getUserInfo,
};
import { use } from "react";
import { ProjectPost } from "../../../types";

interface Repo {
    name: string
    full_name: string
    author: string
    description: string
    created_at: Date
}

// const RepoSchema = z.object({
//     name: z.string(),
//     author: z.string(),
//     description: z.string(),
    
// });

export const RepoList = ({ resourcePromise }) => {
    // const result = resource.result.read();
    const data : ProjectPost = use(resourcePromise);

    return (
        <ul>
            {data.map((repo) => <li key={repo.full_name}>{repo.name}</li>)}
        </ul>
    );
};
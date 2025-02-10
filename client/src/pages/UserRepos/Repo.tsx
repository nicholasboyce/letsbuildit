import { use } from "react";

interface Repo {
    name: string
    full_name: string
    author: string
    description: string
    created_at: Date
}

interface RepoProps {
    repo: Repo
}

// const RepoSchema = z.object({
//     name: z.string(),
//     author: z.string(),
//     description: z.string(),
// });

const Repo = ({ repo }: RepoProps) => {
    const postDate = new Date(repo.created_at);
    return (
        <li>
            <article>
                <h2><a href={repo.html_url}>{repo.name}</a></h2>
                <p>{repo.description ? repo.description : "Description not found."}</p>
                <p>Posted: <time datetime={repo.created_at}>{postDate.toUTCString()}</time></p>
            </article>
        </li>
    )
};

export const RepoList = ({ resourcePromise }) => {
    // const result = resource.result.read();
    const unsortedData = use(resourcePromise);
    const data = unsortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <ul>
            {data.map((repo) => {
                return <Repo key={repo.full_name} repo={repo} />
            })}
        </ul>
    );
};
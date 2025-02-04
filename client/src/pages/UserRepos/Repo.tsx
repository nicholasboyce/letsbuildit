import { use } from "react";

export const Repo = ({ resourcePromise }) => {
    // const result = resource.result.read();
    const data = use(resourcePromise);

    return (
        data.map((repo) => <p>{repo.name}</p>)
    );
};
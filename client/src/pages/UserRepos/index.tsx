import { useParams } from "react-router-dom";
import { wrapPromise } from "../../utils/wrapPromise";

export const UserRepos = () => {
    const { name } = useParams();

    const repoResponse = fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json());
    const repoData = wrapPromise(repoResponse);

    const repos = repoData.read();
    return (
        <>
        <div>
            <p>Hello!</p>
        </div>
        </>
    );
};
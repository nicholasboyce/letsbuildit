import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { wrapPromise } from "../../utils/wrapPromise";

export const UserRepos = () => {
    const { name } = useParams();
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch(`https://api.github.com/users/${name}/repos`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRepos(data);
            });
    }, [name]);

    console.log(repos);
    return (<></>);
};
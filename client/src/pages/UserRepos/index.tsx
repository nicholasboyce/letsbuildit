import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserRepos = () => {
    const { name } = useParams();
    useEffect(() => {
        fetch(`https://api.github.com/users/${name}/repos`)
            .then(response => response.json())
            .then(data => console.log(data));
    }, [name]);
    return (<></>);
};
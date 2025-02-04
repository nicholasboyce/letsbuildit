// 'use client';

import { useParams } from "react-router-dom";
// import { exportJSONTest } from "../../utils/wrapPromise";
import { RepoList } from "./Repo";
import { Suspense } from "react";

export const UserRepos = () => {
    const { name } = useParams();

    const fetchJSON = () => fetch(`https://api.github.com/users/${name}/repos`).then(response => response.json());
    const dataPromise = fetchJSON();

    return (
        <>
        <div>
            <p>Hello {name} !</p>
            <Suspense fallback={<h1>Loading...</h1>}>
                <RepoList resourcePromise={dataPromise} />
            </Suspense>
            <p>Hey...</p>
        </div>
        </>
    );
};
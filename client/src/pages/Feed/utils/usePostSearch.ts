import { useEffect, useState } from "react";
import { ProjectPost } from "../../../../types";
import json from './MOCK_DATA.json';

export const usePostSearch = (params: URLSearchParams) => {
    const data : ProjectPost[] = json;
    const [posts, setPosts] = useState<ProjectPost[]>(data);
    // const abortController = new AbortController();
    // const signal = abortController.signal;

    // const base = new URL('./posts.json');
    // const url = `${base}${params.toString()}`;
    const url = `localhost:3000/search?${params.toString()}`;
    const request = new Request(url, {
        method: "GET"
    });

    // useEffect(() => {
    //     fetch(request, { signal })
    //         .then(response => response.json())
    //         .then(data => setPosts(data))
    //         .catch((error) => {
    //             if (error.name === 'AbortError') {
    //                 console.log("Request cancelled.")
    //             }
    //         })
    //     return () => {
    //         abortController.abort();
    //     };
    // }, [request, signal]);

    useEffect(() => {
        console.log(request);
    }, [params]);
    return posts;
};
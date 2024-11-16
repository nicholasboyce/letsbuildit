import { useEffect, useState } from "react";

export const usePostSearch = (params: URLSearchParams) => {
    const [posts, setPosts] = useState([]);
    const abortController = new AbortController();
    const signal = abortController.signal;

    const base = new URL('./posts.json');
    const url = `${base}${params.toString()}`;
    const request = new Request(url, {
        method: "GET"
    });

    useEffect(() => {
        fetch(request, { signal })
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log("Request cancelled.")
                }
            })
        return () => {
            abortController.abort();
        };
    }, [request]);
    return posts;
};
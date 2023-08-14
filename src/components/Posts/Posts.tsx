'use client'

import {useQuery} from "@tanstack/react-query";
import {fetchPosts} from "@/services/api";

function Posts() {
    const {data, isError, isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error fetching posts</p>
    }

    console.log('data', data)

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data?.map(d => (
                    <li key={d.id}>{d.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Posts;
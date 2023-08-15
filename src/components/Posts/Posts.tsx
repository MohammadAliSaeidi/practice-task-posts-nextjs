'use client'

import {useQuery} from "@tanstack/react-query";
import {fetchPosts} from "@/services/api";
import {PostType} from '@/types/Post.type'
import Post from '@/components/Post'
import {Stack, Typography, Container} from "@mui/material";

function Posts() {
    const {data: postsData, isError, isLoading} =
        useQuery<PostType[]>({
            queryKey: ["posts"],
            queryFn: fetchPosts,
        });

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error fetching posts</p>
    }

    return (
        <Container>
            <Typography variant={"h2"}>Posts</Typography>
            <Stack spacing={2} direction={"column"}>
                {postsData?.map(postData => (
                    <Post postData={postData}/>
                ))}
            </Stack>
        </Container>
    );
}

export default Posts;
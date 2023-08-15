'use client'

import {useQuery} from "@tanstack/react-query";
import {fetchPosts} from "@/services/api";
import {PostType} from '@/types'
import Post from '@/components/Post'
import {Grid, Typography, Container} from "@mui/material";

function Posts() {
	const {data: postsData, isError, isLoading} = useQuery<PostType[]>({
																		   queryKey: ["posts"],
																		   queryFn: fetchPosts,
																		   // refetchInterval: 10000,
																		   retry: 3,
																	   });

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Error fetching posts</p>
	}

	return <Container maxWidth={"lg"} sx={{marginBlock: '24px'}}>
		<Typography variant={"h2"}>Posts</Typography>
		<Grid container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 2, md: 12}}>
			{postsData?.map(postData => (<Post key={postData.id} postData={postData}/>))}
		</Grid>
	</Container>
}

export default Posts;
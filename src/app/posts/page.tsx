'use client'

import {useSearchParams, useRouter} from 'next/navigation'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {QueryFunctionContext, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchPostById, fetchUserById} from "@/services/api";
import {PostType, UserType} from "@/types";
import './post.css'
import {Avatar, CardHeader, Divider, Skeleton} from "@mui/material";

export default function Post() {
	const searchParams = useSearchParams()
	const router = useRouter();
	const postId = searchParams.get('postId') as string
	if (postId === "") {
		router.push('/404')
	}

	const queryClient = useQueryClient();
	const cachedPostsData = queryClient.getQueryData<PostType[]>(['posts']);
	const cachedPost = cachedPostsData?.find(post => post.id === parseInt(postId));
	const {
		data: postData, isLoading: isLoadingFetchPost
	} = useQuery<PostType | null>({
									  queryKey: ["post", postId],
									  queryFn: (queryFunctionContext: QueryFunctionContext) => fetchPostById(queryFunctionContext, postId),
									  initialData: cachedPost,
									  retry: 3
								  });

	const userId = postData ? postData.id : -1;

	const {
		data: userData, isError: isErrorFetchUser, isLoading: isLoadingFetchUser
	} = useQuery<UserType | null>({
									  queryKey: ["user", userId],
									  queryFn: (queryFunctionContext: QueryFunctionContext) => fetchUserById(queryFunctionContext, userId),
									  retry: 3,
									  enabled: !!userId,
								  });

	const {
		data: commentsData, isError: isErrorFetchCommentsData, isLoading: isLoadingFetchcCmmentsData
	} = useQuery<UserType | null>({
									  queryKey: ["user", userId],
									  queryFn: (queryFunctionContext: QueryFunctionContext) => fetchUserById(queryFunctionContext, userId),
									  retry: 3,
									  enabled: !!userId,
								  });

	if (isLoadingFetchPost) {
		return <p>Loading...</p>
	}

	let authorInfo;
	if (userData && postData) {
		authorInfo = <CardHeader sx={{paddingInline: 0}}
								 avatar={<Avatar>{userData.firstname[0]}</Avatar>}
								 title={`${userData.firstname} ${userData.lastname}`}
								 subheader={postData.publishedAt}
		/>
	}
	else if (isLoadingFetchUser || isErrorFetchUser) {
		authorInfo = <CardHeader
			avatar={<Skeleton variant="circular" width={40} height={40}/>}
			title={<Skeleton sx={{marginBottom: 4}} variant="rounded" width={210} height={20}/>}
			subheader={<Skeleton variant="rounded" width={54} height={20}/>}
		/>
	}

	return (<Container maxWidth={"lg"} sx={{marginBlock: '24px'}}>
		<Typography sx={{marginBottom: '1rem'}} variant="h1">{postData && postData.title}</Typography>
		{authorInfo}
		<Divider sx={{marginBlock: 3}}/>
		{postData && <Typography sx={{marginBlock: 3}} variant={'body1'}>{postData.content}</Typography>}
		<Divider sx={{marginBlock: 3}}/>
		<Typography variant="h2">Comments</Typography>
	</Container>);
}
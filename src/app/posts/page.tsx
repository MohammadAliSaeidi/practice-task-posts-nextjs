'use client'

import {useSearchParams, useRouter} from 'next/navigation'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {QueryFunctionContext, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchComments, fetchPostById, fetchUserById} from "@/services/api";
import {CommentType, PostType, UserType} from "@/types";
import './post.css'
import {Avatar, CardHeader, Divider, Skeleton} from "@mui/material";
import Comment from '@/components/Comment'

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
		data: commentsData, isError: isErrorFetchCommentsData, isLoading: isLoadingFetchCmmentsData
	} = useQuery<CommentType[]>({
									queryKey: ["comments"], queryFn: fetchComments, retry: 3,
								});

	if (isLoadingFetchPost) {
		return <p>Loading...</p>
	}

	function AuthorInfo() {
		if (userData && postData) {
			return <CardHeader sx={{paddingInline: 0}}
							   avatar={<Avatar>{userData.firstname[0]}</Avatar>}
							   title={`${userData.firstname} ${userData.lastname}`}
							   subheader={postData.publishedAt}
			/>
		}
		else if (isLoadingFetchUser || isErrorFetchUser) {
			return <CardHeader
				avatar={<Skeleton variant="circular" width={40} height={40}/>}
				title={<Skeleton sx={{marginBottom: 4}} variant="rounded" width={210} height={20}/>}
				subheader={<Skeleton variant="rounded" width={54} height={20}/>}
			/>
		}
	}

	function Comments() {
		if(commentsData){
			return commentsData.map(comment => {
				if(comment.postId === parseInt(postId))
				{
					return <Comment data={comment}/>
				}
			})
		}
	}

	return (<Container maxWidth={"lg"} sx={{marginBlock: '24px'}}>
		<Typography sx={{marginBottom: '1rem'}} variant="h1">{postData && postData.title}</Typography>
		{<AuthorInfo />}
		<Divider sx={{marginBlock: 3}}/>
		{postData && <Typography sx={{marginBlock: 3}} variant={'body1'}>{postData.content}</Typography>}
		<Divider sx={{marginBlock: 3}}/>
		<Typography variant="h2">Comments</Typography>
		<Comments />
	</Container>);
}
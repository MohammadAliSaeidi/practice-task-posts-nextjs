'use client'

import {PostType, UserType} from '@/types'
import {
	Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Divider, Grid, Skeleton, Typography
} from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useEffect, useState} from "react";
import {QueryFunctionContext, useQuery} from "@tanstack/react-query";
import {fetchUserById} from "@/services/api";
import Link from "next/link";


function Post({postData}: { postData: PostType }) {
	const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false)

	const sampleContent = postData.content.slice(0, 100);
	const {
		data: userData, isError: isErrorFetchUser, isLoading: isLoadingFetchUser
	} = useQuery<UserType | null>({
									  queryKey: ["user", postData.userId],
									  queryFn: (queryFunctionContext: QueryFunctionContext) => fetchUserById(queryFunctionContext, postData.userId),
									  retry: 3,
								  });

	let cardHeader;
	if (userData) {
		cardHeader = <CardHeader
			avatar={<Avatar>{userData.firstname[0]}</Avatar>}
			title={`${userData.firstname} ${userData.lastname}`}
			subheader={postData.publishedAt}
		/>
	}
	else if (isLoadingFetchUser || isErrorFetchUser) {
		cardHeader = <CardHeader
			avatar={<Skeleton variant="circular" width={40} height={40}/>}
			title={<Skeleton sx={{marginBottom: 4}} variant="rounded" width={210} height={20}/>}
			subheader={<Skeleton variant="rounded" width={54} height={20}/>}
		/>
	}

	return <Grid item xs={1} sm={2} md={6}>
		<Card sx={{minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
			{cardHeader}

			{!imageIsLoaded && <Skeleton variant={'rectangular'} height={300}/>}
			<CardMedia
				component='img'
				onLoad={() => setImageIsLoaded(true)}
				alt={postData.slug}
				src={postData.image}
				loading="lazy"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">{postData.title}</Typography>
				<Typography variant={"body2"} color="text.secondary">{sampleContent}</Typography>
				<Link href={`/posts?postId=${postData.id}`}>{postData.id}</Link>
			</CardContent>
			<CardActions>
				<Checkbox icon={<BookmarkBorderIcon/>} checkedIcon={<BookmarkIcon/>}/>
			</CardActions>
		</Card>
	</Grid>
}

export default Post;
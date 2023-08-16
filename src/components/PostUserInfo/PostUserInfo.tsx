import React from 'react';
import {QueryFunctionContext, useQuery} from "@tanstack/react-query";
import {UserType} from "@/types";
import {fetchUserById} from "@/services/api";
import {Avatar, CardHeader, Skeleton} from "@mui/material";

function PostUserInfo({userId, publishedAt}: { userId: number, publishedAt?: string }) {
	const {
		data: userData, isError: isErrorFetchUser, isLoading: isLoadingFetchUser
	} = useQuery<UserType | null>({
									  queryKey: ["user", userId],
									  queryFn: (queryFunctionContext: QueryFunctionContext) => fetchUserById(queryFunctionContext, userId),
									  retry: 3,
								  });

	function UserInfo() {
		if (userData) {
			return <CardHeader sx={{paddingInline: 0}}
							   avatar={<Avatar>{userData.firstname[0]}</Avatar>}
							   title={`${userData.firstname} ${userData.lastname}`}
							   subheader={publishedAt}
			/>
		}
		else if (isLoadingFetchUser || isErrorFetchUser) {
			return <CardHeader
				avatar={<Skeleton variant="circular" width={40} height={40}/>}
				title={<Skeleton sx={{marginBottom: 4}} variant="rounded" width={210} height={20}/>}
				subheader={publishedAt && <Skeleton variant="rounded" width={54} height={20}/>}
			/>
		}
		else {
			return null
		}
	}

	return <UserInfo/>
}

export default PostUserInfo;
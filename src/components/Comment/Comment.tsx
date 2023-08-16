import React from 'react';
import {Divider} from "@mui/material";
import {CommentType, UserType} from "@/types";
import PostUserInfo from "@/components/PostUserInfo";

function Comment({data}: { data: CommentType }) {
	return (<div>
		<PostUserInfo userId={data.userId}/>
		<Divider/>
	</div>);
}

export default Comment;
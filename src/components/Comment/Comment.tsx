import React from 'react';
import {Divider, Typography} from "@mui/material";
import {CommentType, UserType} from "@/types";
import PostUserInfo from "@/components/PostUserInfo";

function Comment({data}: { data: CommentType }) {
    return (<div>
        <PostUserInfo userId={data.userId}/>
        <Divider sx={{marginBottom: 1}}/>
        <Typography variant={'body2'}>{data.comment}</Typography>
    </div>);
}

export default Comment;
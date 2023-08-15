'use client'

import {PostType} from '@/types/Post.type'
import {Card, CardActions, CardContent, Checkbox, Divider, Typography} from "@mui/material";
import Favorite from '@mui/icons-material/Favorite';
import {FavoriteBorder} from "@mui/icons-material";

function Post({postData}: { postData: PostType }) {

    const sampleContent = postData.content.slice(0, 100);

    return (
        <Card>
            <CardContent>
                <Typography variant={"h3"}>{postData.title}</Typography>
                <Typography variant={"body1"}>{sampleContent}...</Typography>
            </CardContent>
            <Divider/>
            <CardActions>
                <Checkbox sx={{
                    '&.Mui-checked': {
                        color: '#FF4154',
                    },
                }} icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
            </CardActions>
        </Card>
    );
}

export default Post;
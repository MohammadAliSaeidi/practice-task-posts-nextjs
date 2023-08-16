'use client'

import React from 'react';
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useTheme} from '@mui/material/styles';


function Page() {
    const theme = useTheme();

    return (
        <Container maxWidth={'lg'}>
            <Typography variant={"h1"}>Write a new post</Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField title={'short slug for the post'} margin={"normal"} fullWidth required id="slug"
                           label="Slug"
                           variant="outlined"/>
                <TextField margin={"normal"} fullWidth required id="title" label="Title" variant="outlined"/>
                <Box marginBlock={2} border={'1px dashed'} borderRadius={theme.shape.borderRadius + 'px'}
                     paddingY={5}
                     borderColor={theme.palette.action.disabled}
                     display={"flex"} alignItems={"center"} flexDirection={'column'} gap={2}>
                    <p style={{}}>Drag image here</p>
                    <Button variant={"contained"}>Or select file</Button>
                </Box>
                <TextField margin={"normal"} fullWidth multiline rows={10} maxRows={30} required id="content"
                           label="Content"
                           variant="outlined"/>
            </Box>
        </Container>
    );
}

export default Page;
"use client";

import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }, typography: {
        h1: {
            fontSize: '42px'
        }, h2: {
            fontSize: '36px'
        }, h3: {
            fontSize: '32px'
        }, h4: {
            fontSize: '28px'
        }, h5: {
            fontSize: '24px'
        }, h6: {
            fontSize: '18px'
        }, body1: {
            lineHeight: 2
        },
        body2:{
            lineHeight: 2
        }
    }
});


function Providers({children}: React.PropsWithChildren) {
    const [client] = React.useState(new QueryClient({defaultOptions: {queries: {staleTime: 5000}}}));

    return (<QueryClientProvider client={client}>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </ThemeProvider>
    </QueryClientProvider>);
}

export default Providers;

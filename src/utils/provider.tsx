"use client";

import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function Providers({children}: React.PropsWithChildren) {
    const [client] = React.useState(
        new QueryClient({defaultOptions: {queries: {staleTime: 5000}}})
    );

    return (
        <QueryClientProvider client={client}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {children}
                <ReactQueryDevtools initialIsOpen={false}/>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default Providers;

import axios from "axios";
import {Post} from "@/types/Post.type";
import {QueryFunctionContext} from "react-query";

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.org'
})

export async function fetchPosts({signal}: QueryFunctionContext): Promise<Post[]> {
    try {
        const response = await axiosInstance.get('/posts', {signal});
        return response.data as Post[];
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.log('Request aborted');
        } else {
            console.error('Error fetching posts:', error);
        }
        return [];
    }
};
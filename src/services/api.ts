import axios from "axios";
import {PostType, UserType} from "@/types";
import {QueryFunctionContext} from "react-query";

const axiosInstance = axios.create({
									   baseURL: 'https://jsonplaceholder.org'
								   })

export async function fetchPosts({signal}: QueryFunctionContext): Promise<PostType[]> {
	console.log('fetching posts')
	try {
		const response = await axiosInstance.get('/posts', {signal});
		return response.data as PostType[];
	}
	catch (error: any) {
		if (error.name === 'AbortError') {
			console.log('Request aborted');
		}
		else {
			console.error('Error fetching posts:', error);
		}
		return [];
	}
}

export async function fetchUserById({signal}: QueryFunctionContext, userId: number): Promise<UserType | null> {
	try {
		const response = await axiosInstance.get(`/users/${userId}`, {signal});
		console.log(response)
		return response.data as UserType;
	}
	catch (error: any) {
		if (error.name === 'AbortError') {
			console.log('Request aborted');
		}
		else {
			console.error('Error fetching posts:', error);
		}
		return null;
	}
}
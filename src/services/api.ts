import axios from "axios";
import {PostType, UserType, CommentType} from "@/types";
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
			console.error('Error fetching user by id: ' + userId, error);
		}
		return null;
	}
}


export async function fetchPostById({signal}: QueryFunctionContext, postId: string): Promise<PostType | null> {
	try {
		const response = await axiosInstance.get(`/posts/${postId}`, {signal});
		console.log(response)
		return response.data as PostType;
	}
	catch (error: any) {
		if (error.name === 'AbortError') {
			console.log('Request aborted');
		}
		else {
			console.error('Error fetching post by id: ' + postId, error);
		}
		return null;
	}
}

export async function fetchComments({signal}: QueryFunctionContext): Promise<CommentType[]> {
	console.log('fetching posts')
	try {
		const response = await axiosInstance.get('/comments', {signal});
		return response.data as CommentType[];
	}
	catch (error: any) {
		if (error.name === 'AbortError') {
			console.log('Request aborted');
		}
		else {
			console.error('Error fetching comments:', error);
		}
		return [];
	}
}
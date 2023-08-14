import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.org'
})

export const fetchPosts = async (
    abortController?: AbortController,
    timeout?: number
) => {
    const controller = abortController || new AbortController();
    const signal = controller.signal;

    try {
        const response = await axiosInstance.get('/posts', {
            signal,
            timeout
        });
        return response.data;
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.log('Request aborted due to timeout');
        } else {
            console.error('Error fetching posts:', error);
        }
        return [];
    }
};
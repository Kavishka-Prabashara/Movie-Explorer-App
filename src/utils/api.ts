// src/utils/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://movixflore-backend-1.onrender.com/api';

export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

export const fetchTopRatedMovies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top_rated_movies`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching top rated movies:', error);
        throw error;
    }
};

export const searchMovies = async (query: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search/movies?query=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error: any) {
        console.error(`Error searching for movies with query "${query}":`, error);
        throw error;
    }
};
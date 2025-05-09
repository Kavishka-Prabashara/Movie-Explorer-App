// HomePage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography
} from '@mui/material';

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
}

interface HomePageProps {
    selectedLanguage: string;
    selectedGenre: string;
}

const HomePage: React.FC<HomePageProps> = ({ selectedLanguage, selectedGenre }) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/movies')
            .then((res) => {
                if (res.data && Array.isArray(res.data.results)) {
                    setMovies(res.data.results);
                } else {
                    setMovies([]); // fallback to empty array if unexpected structure
                }
            })
            .catch((err) => {
                console.error('Error fetching movies:', err);
                setMovies([]); // prevent undefined state on error
            });
    }, []);


    return (
        <div>
            <Grid container spacing={2} padding={2}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="300"
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{movie.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rating: {movie.vote_average}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <h1>Welcome to the Home Page</h1>
            <p><strong>Selected Language:</strong> {selectedLanguage || "None"}</p>
            <p><strong>Selected Genre:</strong> {selectedGenre || "None"}</p>
        </div>
    );
};

export default HomePage;

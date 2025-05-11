// pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Button,
    Box,
    Container,
    Grid,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetail';

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    overview?: string;
    release_date?: string;
}

interface HomePageProps {
    selectedLanguage: string;
    selectedGenre: string;
}

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const HomePage: React.FC<HomePageProps> = ({ selectedLanguage, selectedGenre }) => {
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [visibleAllMovies, setVisibleAllMovies] = useState<Movie[]>([]);
    const [visibleTopRatedMovies, setVisibleTopRatedMovies] = useState<Movie[]>([]);
    const [showAllMoviesButton, setShowAllMoviesButton] = useState(true);
    const [showTopRatedMoviesButton, setShowTopRatedMoviesButton] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialLoadCount = 4;

    useEffect(() => {
        // Fetch all movies
        axios
            .get('https://movixflore-backend-1.onrender.com/api/movies')
            .then((res) => {
                if (res.data?.results?.length) {
                    setAllMovies(res.data.results);
                    setVisibleAllMovies(res.data.results.slice(0, initialLoadCount));
                    setShowAllMoviesButton(res.data.results.length > initialLoadCount);
                }
            })
            .catch((err) => {
                console.error('Error fetching all movies:', err);
            });

        // Fetch top-rated movies
        axios
            .get('https://movixflore-backend-1.onrender.com/api/top_rated_movies')
            .then((res) => {
                if (res.data?.results?.length) {
                    setTopRatedMovies(res.data.results);
                    setVisibleTopRatedMovies(res.data.results.slice(0, initialLoadCount));
                    setShowTopRatedMoviesButton(res.data.results.length > initialLoadCount);
                }
            })
            .catch((err) => {
                console.error('Error fetching top-rated movies:', err);
            });
    }, []);

    const handleShowAllMovies = () => {
        setVisibleAllMovies(allMovies);
        setShowAllMoviesButton(false);
    };

    const handleShowTopRatedMovies = () => {
        setVisibleTopRatedMovies(topRatedMovies);
        setShowTopRatedMoviesButton(false);
    };

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                <strong>Selected Language:</strong> {selectedLanguage || 'None'}
            </Typography>
            <Typography variant="h6" gutterBottom>
                <strong>Selected Genre:</strong> {selectedGenre || 'None'}
            </Typography>

            {/* All Movies */}
            <Box mt={3}>
                <Typography variant="h5" gutterBottom>
                    All Movies
                </Typography>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {visibleAllMovies.map((movie) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                <Item>
                                    <MovieCard movie={movie} onMovieClick={() => handleMovieClick(movie)} />
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                {showAllMoviesButton && (
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="outlined" onClick={handleShowAllMovies}>
                            See All
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Top Rated Movies */}
            <Box mt={5}>
                <Typography variant="h5" gutterBottom>
                    Top Rated Movies
                </Typography>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {visibleTopRatedMovies.map((movie) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                <Item>
                                    <MovieCard movie={movie} onMovieClick={() => handleMovieClick(movie)} />
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                {showTopRatedMoviesButton && (
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="outlined" onClick={handleShowTopRatedMovies}>
                            See All
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Movie Details Modal */}
            <MovieDetailsModal open={isModalOpen} onClose={handleCloseModal} movie={selectedMovie} />
        </Box>
    );
};

export default HomePage;

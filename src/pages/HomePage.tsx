// HomePage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid,
    Typography,
    Button,
    Box,
    Container // Import the Container component
} from '@mui/material';
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
        const fetchAllMovies = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/movies');
                if (res.data && Array.isArray(res.data.results)) {
                    setAllMovies(res.data.results);
                    setVisibleAllMovies(res.data.results.slice(0, initialLoadCount));
                    setShowAllMoviesButton(res.data.results.length > initialLoadCount);
                } else {
                    setAllMovies([]);
                    setVisibleAllMovies([]);
                    setShowAllMoviesButton(false);
                }
            } catch (err) {
                console.error('Error fetching all movies:', err);
                setAllMovies([]);
                setVisibleAllMovies([]);
                setShowAllMoviesButton(false);
            }
        };

        const fetchTopRatedMovies = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/top_rated_movies');
                if (res.data && Array.isArray(res.data.results)) {
                    setTopRatedMovies(res.data.results);
                    setVisibleTopRatedMovies(res.data.results.slice(0, initialLoadCount));
                    setShowTopRatedMoviesButton(res.data.results.length > initialLoadCount);
                } else {
                    setTopRatedMovies([]);
                    setVisibleTopRatedMovies([]);
                    setShowTopRatedMoviesButton(false);
                }
            } catch (err) {
                console.error('Error fetching top rated movies:', err);
                setTopRatedMovies([]);
                setVisibleTopRatedMovies([]);
                setShowTopRatedMoviesButton(false);
            }
        };

        fetchAllMovies();
        fetchTopRatedMovies();
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
        <div>
            <h1>Welcome to the Home Page</h1>
            <p><strong>Selected Language:</strong> {selectedLanguage || "None"}</p>
            <p><strong>Selected Genre:</strong> {selectedGenre || "None"}</p>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>
                    All Movies
                </Typography>
                <Container maxWidth="lg"> {/* Wrap Grid with Container */}
                    <Grid container spacing={2}>
                        {visibleAllMovies.map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                                <MovieCard movie={movie} onMovieClick={handleMovieClick} />
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

            <Box mt={5}>
                <Typography variant="h5" gutterBottom>
                    Top Rated Movies
                </Typography>
                <Container maxWidth="lg"> {/* Wrap Grid with Container */}
                    <Grid container spacing={2}>
                        {visibleTopRatedMovies.map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                                <MovieCard movie={movie} onMovieClick={handleMovieClick} />
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

            <MovieDetailsModal open={isModalOpen} onClose={handleCloseModal} movie={selectedMovie} />
        </div>
    );
};

export default HomePage;
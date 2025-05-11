import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../utils/api';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MovieCard, { type Movie } from '../components/MovieCard';

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async (): Promise<void> => {
            if (!query) {
                setSearchResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await searchMovies(query);
                setSearchResults(data.results || []);
            } catch (err: unknown) {
                setError('Failed to load search results.');
                if (err instanceof Error) {
                    console.error(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        void fetchSearchResults();
    }, [query]);

    const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Search Results for "{query}"
            </Typography>
            {searchResults.length > 0 ? (
                <Grid container spacing={2}>
                    {searchResults.map((movie) => (
                        <MovieCard movie={movie} onMovieClick={handleMovieClick} />
                    ))}
                </Grid>
            ) : (
                <Typography>No movies found for "{query}".</Typography>
            )}
        </Container>
    );
};

export default SearchResultsPage;

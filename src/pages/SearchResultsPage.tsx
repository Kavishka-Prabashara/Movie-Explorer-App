// pages/SearchResultsPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../utils/api.ts';
import { Grid, Typography, Box, CircularProgress, Container } from '@mui/material';
import MovieCard from '../components/MovieCard.tsx';

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    // Add other relevant properties if needed
}

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
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
                setLoading(false);
            } catch (err: any) {
                setError('Failed to load search results.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchSearchResults();
    }, [query]);

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
                        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>No movies found for "{query}".</Typography>
            )}
        </Container>
    );
};

export default SearchResultsPage;
// MovieCard.tsx

import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    // Add other relevant movie details here if needed by this component
}

interface MovieCardProps {
    movie: Movie;
    onMovieClick: (movie: Movie) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        cursor: 'pointer',
    },
}));

const StyledCardMedia = styled(CardMedia)({
    height: 300,
});

const MovieCard: React.FC<MovieCardProps> = ({ movie, onMovieClick }) => (
    <StyledCard onClick={() => onMovieClick(movie)}>
        <StyledCardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
        />
        <CardContent>
            <Typography variant="h6" gutterBottom>
                {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Rating: {movie.vote_average}
            </Typography>
        </CardContent>
    </StyledCard>
);

export default MovieCard;
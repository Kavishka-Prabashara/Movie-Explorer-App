// components/MovieCard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export interface Movie {
    id: number;
    poster_path: string | null;
    title: string;
    vote_average: number;
}

interface MovieCardProps {
    movie: Movie;
    onMovieClick?: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onMovieClick }) => {
    return (
        <Box
            onClick={() => onMovieClick?.(movie.id)}
            sx={{
                padding: 1,
                textAlign: 'center',
                color: 'text.secondary',
                cursor: 'pointer',
                boxShadow: 2,
                borderRadius: 2,
                '&:hover': {
                    transform: 'scale(1.03)',
                    transition: 'transform 0.2s',
                },
            }}
        >
            {movie.poster_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height={200}
                    bgcolor="grey.300"
                    color="grey.700"
                >
                    No Poster
                </Box>
            )}
            <Typography variant="subtitle1" mt={1} noWrap>
                {movie.title}
            </Typography>
            <Typography variant="body2">Rating: {movie.vote_average}</Typography>
        </Box>
    );
};

export default MovieCard;

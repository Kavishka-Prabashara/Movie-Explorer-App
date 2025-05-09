// MovieDetailsModal.tsx

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    overview?: string;
    release_date?: string;
    // Add other relevant movie details here
}

interface MovieDetailsModalProps {
    open: boolean;
    onClose: () => void;
    movie: Movie | null;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ open, onClose, movie }) => (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="movie-details-title"
        aria-describedby="movie-details-description"
    >
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}
        >
            <Typography id="movie-details-title" variant="h6" component="h2" gutterBottom>
                {movie?.title}
            </Typography>
            {movie?.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    style={{ marginBottom: '16px', maxWidth: '100%', height: 'auto' }}
                />
            )}
            <Typography id="movie-details-description" sx={{ mt: 2 }}>
                Rating: {movie?.vote_average}
            </Typography>
            {movie?.release_date && (
                <Typography id="movie-details-release-date" sx={{ mt: 1 }}>
                    Release Date: {movie.release_date}
                </Typography>
            )}
            {movie?.overview && (
                <Typography id="movie-details-overview" sx={{ mt: 1 }}>
                    Overview: {movie.overview}
                </Typography>
            )}
            {/* Display other movie details here */}
            <Button onClick={onClose} sx={{ mt: 2 }}>
                Close
            </Button>
        </Box>
    </Modal>
);

export default MovieDetailsModal;
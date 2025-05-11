import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import axios from 'axios';

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    overview?: string;
    release_date?: string;
}

interface Video {
    key: string;
    type: string;
    site: string;
}

interface MovieDetailsModalProps {
    open: boolean;
    onClose: () => void;
    movie: Movie | null;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ open, onClose, movie }) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    useEffect(() => {
        if (!movie) return;

        const fetchTrailer = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=YOUR_API_KEY`
                );
                const videos: Video[] = response.data.results;
                const trailer = videos.find(
                    (vid: Video) => vid.type === 'Trailer' && vid.site === 'YouTube'
                );
                setTrailerKey(trailer ? trailer.key : null);
            } catch (error) {
                console.error('Error fetching trailer:', error);
                setTrailerKey(null);
            }
        };

        fetchTrailer();
    }, [movie]);

    return (
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
                    width: '80vw',
                    maxWidth: 1000,
                    height: '90vh',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    overflowY: 'auto',
                }}
            >
                <Typography id="movie-details-title" variant="h4" component="h2" gutterBottom>
                    {movie?.title}
                </Typography>
                {movie?.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ marginBottom: '16px', maxWidth: '100%', height: 'auto' }}
                    />
                )}
                <Typography id="movie-details-rating" sx={{ mt: 2 }}>
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
                {trailerKey && (
                    <Box sx={{ position: 'relative', paddingTop: '56.25%', marginTop: 2 }}>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Movie Trailer"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 0,
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                )}
                <Button onClick={onClose} sx={{ mt: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default MovieDetailsModal;

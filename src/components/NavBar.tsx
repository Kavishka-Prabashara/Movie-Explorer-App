// components/NavBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavBarProps {
    onLanguageChange: (language: string) => void;
    onGenreChange: (genre: string) => void;
    languages: string[];
    genres: string[];
}

const NavBar: React.FC<NavBarProps> = ({ onLanguageChange, onGenreChange, languages, genres }) => {
    const [selectedLanguageLocal, setSelectedLanguageLocal] = React.useState('');
    const [selectedGenreLocal, setSelectedGenreLocal] = React.useState('');

    const handleLanguageChangeLocal = (event: React.ChangeEvent<{ value: string }>) => {
        const language = event.target.value as string;
        setSelectedLanguageLocal(language);
        onLanguageChange(language);
    };

    const handleGenreChangeLocal = (event: React.ChangeEvent<{ value: string }>) => {
        const genre = event.target.value as string;
        setSelectedGenreLocal(genre);
        onGenreChange(genre);
    };

    return (
        <AppBar position="fixed"> {/* Changed position to "fixed" */}
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Movie App
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControl size="small">
                        <InputLabel id="language-select-label">Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={selectedLanguageLocal}
                            label="Language"
                            onChange={handleLanguageChangeLocal}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {languages.map((language) => (
                                <MenuItem key={language} value={language}>{language}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel id="genre-select-label">Genre</InputLabel>
                        <Select
                            labelId="genre-select-label"
                            id="genre-select"
                            value={selectedGenreLocal}
                            label="Genre"
                            onChange={handleGenreChangeLocal}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {genres.map((genre) => (
                                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/user">Account</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
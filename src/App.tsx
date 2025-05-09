// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import UserAccount from "./pages/UserAccount";
import NotFoundPage from "./pages/NotFoundPage";

import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import theme from "./theme";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    const languages = ["English", "Sinhala", "Tamil", "Hindi"];
    const genres = ["Action", "Comedy", "Drama", "Sci-Fi", "Thriller"];

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        console.log(`Selected Language: ${language}`);
    };

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
        console.log(`Selected Genre: ${genre}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <NavBar
                    onLanguageChange={handleLanguageChange}
                    onGenreChange={handleGenreChange}
                    languages={languages}
                    genres={genres}
                />
                <Box
                    sx={{
                        paddingTop: '64px',
                        width: '100vw', // Set width to viewport width
                        overflowX: 'hidden', // Prevent horizontal scrollbar
                    }}
                >
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <HomePage
                                    selectedLanguage={selectedLanguage}
                                    selectedGenre={selectedGenre}
                                />
                            }
                        />
                        <Route path="/movie/:id" element={<MovieDetailsPage />} />
                        <Route path="/user" element={<UserAccount />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;
// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import UserAccount from "./pages/UserAccount";
import NotFoundPage from "./pages/NotFoundPage";
import SearchResultsPage from "./pages/SearchResultsPage"; // Import SearchResultsPage

import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import theme from "./theme";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar"; // Import SearchBar

const App: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for search term in NavBar

    const languages = ["English", "Sinhala", "Tamil", "Hindi"];
    const genres = ["Action", "Comedy", "Drama", "Sci-Fi", "Thriller"];

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        console.log(`Selected Language: ${language}`);
        // Implement your language change logic here (e.g., update context, API calls)
    };

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
        console.log(`Selected Genre: ${genre}`);
        // Implement your genre change logic here (e.g., update context, API calls)
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        // The NavBar's SearchBar will handle navigation
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
                    onSearch={handleSearch} // Pass the search handler to NavBar
                >
                    <SearchBar /> {/* Place SearchBar within NavBar for consistent visibility */}
                </NavBar>
                <Box
                    sx={{
                        paddingTop: '64px', // Adjust based on NavBar height
                        width: '100vw',
                        overflowX: 'hidden',
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
                        <Route path="/search-results" element={<SearchResultsPage />} />
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
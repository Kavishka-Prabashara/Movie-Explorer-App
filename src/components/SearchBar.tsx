// components/SearchBar.tsx
import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchTerm.trim()) {
            navigate(`/search-results?query=${searchTerm}`);
            setSearchTerm(''); // Clear the search bar after submission
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}> {/* Added mr for spacing */}
            <TextField
                size="small"
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(event) => event.key === 'Enter' && handleSearchSubmit()}
            />
            <IconButton size="small" onClick={handleSearchSubmit} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Box>
    );
};

export default SearchBar;
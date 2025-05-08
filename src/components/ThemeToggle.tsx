// components/ThemeToggleButton.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface Props {
    isDarkMode: boolean;
    onThemeToggle: () => void;
}

const ThemeToggleButton: React.FC<Props> = ({ isDarkMode, onThemeToggle }) => {
    return (
        <IconButton onClick={onThemeToggle} color="inherit">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
};

export default ThemeToggleButton;
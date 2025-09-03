import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../navbar';
import CssBaseline from '@mui/material/CssBaseline';


interface AboutProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const About = ({ darkMode, toggleDarkMode }: AboutProps) => {
    const theme = useTheme();
    return (
        <>
            <Box>
                <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                <Typography variant="h3" align="center" gutterBottom>
                    About
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Welcome to Boston Property Info, your one stop shop for all Boston property information.
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Here you can search for properties by address, search for owners by keyword, or view the properties owned by a specific owner.
                </Typography>
            </Box>
        </>
    );
};

export default About;

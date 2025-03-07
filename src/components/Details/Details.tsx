import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '../navbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface DetailsProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
  }


const Details = ({ darkMode , toggleDarkMode } : DetailsProps) => {
    const location = useLocation();
    const { propertyData } = location.state || {};

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    const renderPropertyData = () => {
        if (Array.isArray(propertyData)) {
            return propertyData.map((prop, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Property {index + 1}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {Object.entries(prop).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                            {key}
                                        </TableCell>
                                        <TableCell>
                                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ));
        } else if (propertyData) {
            return (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Property Details
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {Object.entries(propertyData).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                            {key}
                                        </TableCell>
                                        <TableCell>
                                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            );
        } else {
            return <Typography>No property data available.</Typography>;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '90vh', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1, height: '100%' }}>
                    This will be the map
                </Box>
                <Box sx={{ flex: 2, padding: 2 }}>
                    {renderPropertyData()}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Details;


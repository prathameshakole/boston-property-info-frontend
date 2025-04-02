import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '../navbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropertyMap from './PropertyMap';
import PropertyDetailsTable from './PropertyDetailsTable';

type SearchMode = 'address' | 'owner';

interface DetailsProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Details = ({ darkMode, toggleDarkMode }: DetailsProps) => {
  const location = useLocation();
  const { propertyData, searchMode } = location.state || {};
  const navigate = useNavigate();

  const properties = Array.isArray(propertyData)
    ? propertyData.length > 1
      ? propertyData
      : [propertyData[0]]
    : propertyData
    ? [propertyData]
    : [];

  const propertiesCount = properties.length;

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  });

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, mt: 1 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{ textTransform: 'none' }}
        >
          New Search
        </Button>
        <Typography variant="body1" sx={{ ml: 2 }}>
          {searchMode === 'owner' 
            ? `The owner is associated with ${propertiesCount} ${propertiesCount === 1 ? 'property' : 'properties'}`
            : `The address is associated with ${propertiesCount} ${propertiesCount === 1 ? 'property' : 'properties'}`}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '90vh',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ flex: 1, height: '100%', padding: 1 }}>
          <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden' }}>
            <PropertyMap properties={properties} darkMode={darkMode} />
          </Paper>
        </Box>
        <Box sx={{ flex: 2, padding: 2, overflowY: 'auto' }}>
          <PropertyDetailsTable properties={properties} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Details;

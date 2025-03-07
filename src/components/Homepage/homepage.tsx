import React, { useState } from 'react';
import Box from '@mui/material/Box';
import NavBar from '../navbar';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { getPropertyByAddress, getAddressbyKeyword, getOwnersbyKeyword } from '../client';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
type SearchMode = 'address' | 'owner';

interface HomepageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Homepage = ({ darkMode, toggleDarkMode } : HomepageProps) => {
  const [query, setQuery] = useState<string>('');
  const [properties, setProperties] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>('address');
  const navigate = useNavigate();

  const fetchProperties = async (address: string) => {
    try {
      setError(null);
      const data = await getPropertyByAddress(address);
      setProperties(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const fetchAddressesbyKeyword = async (keyword: string) => {
    try {
      setError(null);
      const data = await getAddressbyKeyword(keyword);
      setProperties(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleListItemClick = async (address: string) => {
    try {
      const propertyData = await getPropertyByAddress(address);
      navigate('/property-details', { state: { propertyData } });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const fetchOwners = async (keyword: string) => {
    try {
      setError(null);
      const data = await getOwnersbyKeyword(keyword);
      setProperties(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleOwnerItemClick = async (owner: string) => {
    try {
      console.log('Owner clicked:', owner);

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSearch = () => {
    if (searchMode === 'address') {
      fetchAddressesbyKeyword(query);
    } else {
      fetchOwners(query);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });


  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, mt: 2, fontWeight: 'bold', color: '#333', fontFamily: 'monospace' }}
          >
            Find Information About Boston Properties
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant={searchMode === 'address' ? 'contained' : 'outlined'}
              onClick={() => {
                setSearchMode('address');
                setProperties([]);
                setQuery('');
                setError(null);
              }}
            >
              Search by Address
            </Button>
            <Button
              variant={searchMode === 'owner' ? 'contained' : 'outlined'}
              onClick={() => {
                setSearchMode('owner');
                setProperties([]);
                setQuery('');
                setError(null);
              }}
            >
              Search by Owner
            </Button>
          </Box>

          {/* Search Bar */}
          <Paper
            component="form"
            elevation={0}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '60%',
              border: '2px solid rgb(204, 204, 204)'
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={searchMode === 'address' ? 'Enter address' : 'Enter owner name'}
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* Error Message */}
          {error && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* Display Results */}
          <Box
            sx={{
              mt: 3,
              width: '60%',
              maxHeight: '300px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            {properties.length > 0 ? (
              <List>
                {properties.map((item, index) => (
                  <ListItem
                    key={index}
                    component="li"
                  >
                    <Button onClick={() =>
                      searchMode === 'address'
                        ? handleListItemClick(item)
                        : handleOwnerItemClick(item)
                    }>
                      <ListItemText primary={item} />
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                No results to show.
              </Typography>
            )}
          </Box>
        </Box>
      </ThemeProvider>

    </div>
  );
};

export default Homepage;

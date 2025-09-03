import React, { useState, useRef} from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import { getPropertyByAddress, getAddressbyKeyword, getOwnersbyKeyword, getPropertiesByOwner } from '../client';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme, ThemeProvider } from '@mui/material/styles';

type SearchMode = 'address' | 'owner';

interface HomepageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Homepage = ({ darkMode, toggleDarkMode }: HomepageProps) => {
  const [query, setQuery] = useState<string>('');
  const [properties, setProperties] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>('address');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  const startLoadingTimer = () => {
    timerRef.current = window.setTimeout(() => {
      setLoading(false);
      setError("Oops! I'm sorry. Something went wrong.");
    }, 10000);
  };

  const clearLoadingTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const fetchAddressesbyKeyword = async (keyword: string) => {
    try {
      setError(null);
      const data = await getAddressbyKeyword(keyword);
      clearLoadingTimer();
      setProperties(data);
      setLoading(false);
      if (data.length === 0) {
        setError("Oops! We couldn't find any matching results.");
      }
    } catch (err: any) {
      clearLoadingTimer();
      console.error(err);
      setError(err.message || "Oops! I'm sorry. Something went wrong.");
      setLoading(false);
    }
  };

  const fetchOwners = async (keyword: string) => {
    try {
      setError(null);
      const data = await getOwnersbyKeyword(keyword);
      clearLoadingTimer();
      setProperties(data);
      setLoading(false);
      if (data.length === 0) {
        setError("Oops! We couldn't find any matching results.");
      }
    } catch (err: any) {
      clearLoadingTimer();
      console.error(err);
      setError(err.message || "Oops! I'm sorry. Something went wrong.");
      setLoading(false);
    }
  };

  const handleListItemClick = async (address: string) => {
    try {
      const propertyData = await getPropertyByAddress(address);
      navigate('/property-details', { state: { propertyData, searchMode } });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Oops! I'm sorry. Something went wrong.");
    }
  };

  const handleOwnerItemClick = async (owner: string) => {
    try {
      const propertyData = await getPropertiesByOwner(owner);
      navigate('/property-details', { state: { propertyData, searchMode } });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Oops! I'm sorry. Something went wrong.");
    }
  };

  const handleSearch = () => {
    setHasSearched(true);
    setLoading(true);
    setProperties([]);
    setError(null);
    startLoadingTimer();

    if (searchMode === 'address') {
      fetchAddressesbyKeyword(query);
    } else {
      fetchOwners(query);
    }
  };

  const theme = useTheme();

  const primaryMain = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const secondaryDark = theme.palette.secondary.dark;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            mt: 2,
            fontWeight: 'bold',
            color: '#333',
            fontFamily: 'monospace'
          }}
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
              setHasSearched(false);
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
              setHasSearched(false);
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
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Display Results */}
        <Box
          sx={{
            mt: 3,
            width: '60%',
            maxHeight: '300px',
            overflowY: 'auto',
            border: properties.length > 0 ? '1px solid #ccc' : 'none',
            borderRadius: '4px',
            p: properties.length > 0 ? 1 : 0,
            minHeight: '80px'
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : properties.length > 0 ? (
            <List>
              {properties.map((item, index) => (
                <ListItem key={index} component="li">
                  <Button
                    onClick={() =>
                      searchMode === 'address'
                        ? handleListItemClick(item)
                        : handleOwnerItemClick(item)
                    }
                  >
                    <ListItemText primary={item} />
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            hasSearched && (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                  {error || "Oops! We couldn't find any matching results."}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Try adjusting your search criteria and try again.
                </Typography>
              </Box>
            )
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;

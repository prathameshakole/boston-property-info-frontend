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
import { getPropertyByAddress, getAddressbyKeyword } from '../client';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
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

  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333', fontFamily: 'monospace' }}>
          Find Information About Boston Properties
        </Typography>

        <Paper component="form" elevation={0} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '60%', border: '2px solid rgb(204, 204, 204)' }}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Enter address" inputProps={{ 'aria-label': 'search' }} value={address} onChange={(e) => setAddress(e.target.value)} />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => fetchAddressesbyKeyword(address)}>
            <SearchIcon />
          </IconButton>
        </Paper>

        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ mt: 3, width: '60%', maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
          {properties.length > 0 ? (
            <List>
              {properties.map((property, index) => (
                <ListItem
                  key={index}
                  component="li"
                  onClick={() => handleListItemClick(property)}
                >
                  <ListItemText primary={property} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
              No properties to show.
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Homepage;

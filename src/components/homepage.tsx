import Box from '@mui/material/Box';
import NavBar from './navbar';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

const Homepage = () => {
  return (
    <div>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack elements vertically
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ mb: 2, fontWeight: 'bold', color: '#333', fontFamily: 'monospace' }} 
        >
          Find Information About Boston Properties
        </Typography>

        <Paper
          component="form"
          elevation={0}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '60%',
            border: '2px solid rgb(204, 204, 204)',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </div>
  );
};

export default Homepage;

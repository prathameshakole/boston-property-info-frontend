import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';

type NavBarProps = {
  toggleDarkMode: () => void;
  darkMode: boolean;
};

const pages = ['Home', 'About'];

function NavBar({ toggleDarkMode, darkMode }: NavBarProps) {

  const theme = useTheme();
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Get the appropriate gradient colors based on dark mode
  const gradientStart = darkMode ? theme.palette.secondary.light : theme.palette.secondary.light;
  const gradientEnd = darkMode ? theme.palette.secondary.dark : theme.palette.secondary.dark;
  
  return (
    <AppBar position="static" sx={{ 
      background: `linear-gradient(90deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
      boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
      borderRadius: 0 // Explicitly set border radius to 0
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HomeWorkOutlinedIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1,
              color: 'white'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Boston Property
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ 
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  borderTop: `3px solid ${theme.palette.secondary.main}`,
                  borderRadius: 0 // Remove border radius from dropdown menu
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page} 
                  onClick={handleCloseNavMenu} 
                  component={Link} 
                  to={page === 'Home' ? '/' : '/about'}
                >
                  <Typography sx={{ textAlign: 'center', fontFamily: 'monospace' }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <HomeWorkOutlinedIcon 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1,
              color: 'white'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              textDecoration: 'none',
            }}
          >
            Boston Property
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={page === 'Home' ? '/' : '/about'}
                sx={{ 
                  mx: 1,
                  my: 2, 
                  color: 'white', 
                  fontFamily: 'monospace',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '3px',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: theme.palette.secondary.main,
                    transition: 'width 0.3s'
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&::after': {
                      width: '80%'
                    }
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          <IconButton 
            onClick={toggleDarkMode} 
            color="inherit"
            sx={{
              border: `1px solid rgba(255,255,255,0.3)`,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
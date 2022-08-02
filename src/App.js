import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home/Home';
import InTheaters from './components/InTheaters/InTheaters';
import ComingSoon from './components/ComingSoon/ComingSoon';
import InTheatersMovie from './components/InTheatersMovie/InTheatersMovie';
import ComingSoonMovie from './components/ComingSoonMovie/ComingSoonMovie';
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

function App() {
  const pages = ['Home', 'In Theaters', 'Coming Soon']
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
      <div>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
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
                FILMSTER
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu bar"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"                
                >
                  <MenuIcon/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  className="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  // sx={{
                  //   display: { xs: 'block', md: 'none' },
                  // }}                
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link className="link" to ='/'> Home </Link>
                      <Link className="link" to ='/movies'> In Theaters </Link>
                      <Link className="link" to ='/upcoming'> Coming Soon </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h4"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                FILMSTER
              </Typography>
              <Box id = "nav_container" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {/* <Button sx={{ my: 3, display: 'block' }}> */}
                  <Link className="link" to ='/'> Home </Link>
                  <Link className="link" to ='/movies'> In Theaters </Link>
                  <Link className="link" to ='/upcoming'> Coming Soon </Link>
                {/* </Button> */}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <main>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/movies' element={<InTheaters/>}/>
            <Route path='/movies/:id' element={<InTheatersMovie/>}/>
            <Route path='/upcoming' element={<ComingSoon/>}/>
            <Route path='/upcoming/:id' element={<ComingSoonMovie/>}/>
          </Routes>
        </main>
      </div>  
  );
}

export default App;

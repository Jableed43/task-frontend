import * as React from 'react';
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
import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';
import useAuth from '../../hooks/useAuth';

function Header() {
    const { isAuthenticated } = useAuth();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const pages = [
        { name: 'Task List', path: '/tasks', show: isAuthenticated }, 
        { name: 'Home', path: '/', show: true }, 
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: " #0E538C" }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {isAuthenticated && (<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.filter(page => page.show).map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography
                                        sx={{ textAlign: 'center', textTransform: "capitalize" }}
                                        component={Link}
                                        to={page.path}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>)}

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.filter(page => page.show).map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                to={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{ fontSize: "1rem", my: 2, color: 'white', display: 'block', textTransform: "capitalize", textAlign: 'center', '&:hover': { backgroundColor: 'black' } }}
                            >
                                {page.name}
                            </Button>
                        ))}
                        <AuthLinks />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;

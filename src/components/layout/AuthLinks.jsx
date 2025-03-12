import { Link, useLocation } from 'react-router-dom';
import { MenuItem, Typography, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../hooks/useAuth';

function AuthLinks() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto', alignItems: 'center' }}>
      {!isAuthenticated && location.pathname !== '/login' && (
        <MenuItem
          component={Link}
          to="/login"
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'black' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderRadius: '4px'
          }}
        >
          <LoginIcon />
          <Typography>Login</Typography>
        </MenuItem>
      )}

      {!isAuthenticated && location.pathname !== '/register' && (
        <MenuItem
          component={Link}
          to="/register"
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'black' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderRadius: '4px'
          }}
        >
          <PersonAddIcon />
          <Typography>Register</Typography>
        </MenuItem>
      )}

      {isAuthenticated && (
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'black' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginLeft: 'auto', 
            borderRadius: '4px'
          }}
        >
          <LogoutIcon />
          <Typography >Logout</Typography>
        </MenuItem>
      )}
    </Box>
  );
}

export default AuthLinks;

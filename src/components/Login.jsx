import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import Layout from './layout/Layout';
import useAuth from '../hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await login(form); 
      if (success) {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleNoUser = () => {
    navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}
        >
          Login
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: 'black' }}
        >
          Don&apos;t have an account yet?
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={handleNoUser}
          >
            ¡Register!
          </span>
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '400px',
            background: '#fff',
            padding: 3,
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            required
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            Input={{
              endAdornment: (
                <Button
                  onClick={togglePasswordVisibility}
                  sx={{
                    fontSize: '1.2rem',
                    color: 'black',
                    background: 'none',
                    boxShadow: 'none',
                    minWidth: 0,
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </Button>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              background: '#0E538C',
              ':hover': { background: '#1976d2' },
              textTransform: "capitalize" 
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Login;

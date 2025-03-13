import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import Layout from './layout/Layout';
import useRegisterUser from '../hooks/user/useRegisterUser';
import Toast from './layout/Toast';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { registerUser, isLoading } = useRegisterUser();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      if (response) {
        navigate('/login');
      }
      Toast.fire({
        icon: "success",
        title: "Created Account",
        text: "You can now log in.",
      });
    } catch (err) {
      console.error('Registration failed:', err.message);
    }
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
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '400px',
            background: '#fff',
            padding: 3,
            marginBottom: 4,
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            required
            fullWidth
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
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
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
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
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Register;

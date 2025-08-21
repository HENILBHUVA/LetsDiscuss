import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, Alert, Tabs, Tab } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {handleRegister, handleLogin} = React.useContext(AuthContext);

  const handleAuth = async() => {
    try {
      setLoading(true);
      if(formState === 0) {
        let result = await handleLogin(username, password);
      }
      if(formState === 1) {
        let result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setUsername("");
        setPassword("");
      }
    } catch(err) {
      let message = (err.response?.data?.message || "Authentication failed");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setFormState(newValue);
    setError('');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1585974738771-84483dd9f89f?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            backgroundColor: '#ccc',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 400,
              mx: 'auto',
              p: 4,
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            
            <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 3, fontWeight: 500 }}>
              {formState === 0 ? 'Sign In' : 'Create Account'}
            </Typography>
            
            <Tabs 
              value={formState} 
              onChange={handleTabChange}
              variant="fullWidth" 
              sx={{ 
                width: '100%', 
                mb: 3,
                '& .MuiTabs-indicator': {
                  height: 3,
                },
              }}
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>

            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  autoFocus={formState === 1}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
              )}
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoFocus={formState === 0}
                autoComplete={formState === 0 ? "username" : "new-username"}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                id="password"
                autoComplete={formState === 0 ? "current-password" : "new-password"}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
              
              {formState === 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" size="small" />}
                    label={<Typography variant="body2">Remember me</Typography>}
                  />
                  <Link href="#" variant="body2" underline="hover">
                    Forgot password?
                  </Link>
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
                onClick={handleAuth}
                disabled={loading}
              >
                {loading ? 'Processing...' : formState === 0 ? 'Sign In' : 'Create Account'}
              </Button>
              
              {formState === 0 ? (
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Don't have an account?{' '}
                  <Link 
                    component="button" 
                    variant="body2" 
                    onClick={() => setFormState(1)}
                    underline="hover"
                    sx={{ fontWeight: 500 }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              ) : (
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <Link 
                    component="button" 
                    variant="body2" 
                    onClick={() => setFormState(0)}
                    underline="hover"
                    sx={{ fontWeight: 500 }}
                  >
                    Sign In
                  </Link>
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
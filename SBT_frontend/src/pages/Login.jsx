import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/login.jpg";


const defaultTheme = createTheme();

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || "Admin"; // Default role is "Admin"
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fieldError, setFieldError] = useState({ email: false, password: false, username: false });
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email?.value;
    const password = event.target.password?.value;
    const username = event.target.username?.value;

    // Basic validation
    if ((role === "Admin" && (!email || !password)) || ((role !== "Admin") && (!username || !password))) {
      setFieldError({
        email: !email && role === "Admin",
        username: !username && role !== "Admin",
        password: !password,
      });
      return;
    }

    setLoader(true);

    // Simulated navigation after login
    setTimeout(() => {
      setLoader(false);
      switch (role) {
        case "Admin":
          navigate('/AdminHomePage');
          break;
        case "Parent":
          navigate('/ParentHomePage');
          break;
        case "General Manager":
          navigate('/GeneralManagerDashboard');
          break;
        case "School Manager":
          navigate('/SchoolManagerDashboard');
          break;
        case "Auditor":
          navigate('/AuditorDashboard');
          break;
        case "HR Manager":
          navigate('/HRManagerDashboard');
          break;
        case "Finance Head":
          navigate('/FinanceHeadDashboard');
          break;
        default:
          navigate('/');
      }
    }, 1500);
  };

  const handleInputChange = () => {
    setFieldError({ email: false, password: false, username: false });
    setLoginError("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid 
          item 
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: 800 },
              padding: 3,
              borderRadius: 4,
              boxShadow: 3,
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'stretch',
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Box 
              sx={{ 
                width: { xs: '100%', sm: '50%' }, 
                mb: { xs: 2, sm: 0 } 
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>
                <span style={{ color: '#187fe0a8', fontWeight: 'bold' }}>Temhert</span>
                <span style={{ color: 'rgb(255, 187, 0)', fontWeight: 'bold' }}> Manager</span>
              </Typography>
              <Typography variant="h7" align="center">
                Welcome back! Please enter your details
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                {role === "Admin" ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter your email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={fieldError.email}
                    helperText={fieldError.email && 'Email is required'}
                    onChange={handleInputChange}
                  />
                ) : (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Enter your username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={fieldError.username}
                    helperText={fieldError.username && 'Username is required'}
                    onChange={handleInputChange}
                  />
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={toggle ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  error={fieldError.password}
                  helperText={fieldError.password && 'Password is required'}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setToggle(!toggle)} edge="end">
                          {toggle ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {loginError && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {loginError}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <FormControlLabel
                    control={<Checkbox sx={{
                      color: "#187fe0a8",
                      '&.Mui-checked': {
                        color: "#18e0e0",
                      },
                    }} />}
                    label="Remember me"
                  />
                  <Link to="#" style={{ color: '#18e0e0', textDecoration: 'none' }}>
                    Forgot Password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    mb: 1, 
                    bgcolor: "#18e0e0",
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: '#18e0e0', color:'black',
                    }
                  }}
                >
                  {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>

                {role === "Admin" && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2">
                      {"Don't have an account?"}
                    </Typography>
                    <Link to="/AdminRegisterPage" style={{ color: '#18e0e0', textDecoration: 'none' }}>
                      <Typography sx={{ bgcolor: "#18e0e0", color: "#fff", px: 2, py: 1, borderRadius: 1 }}>
                        Sign Up
                      </Typography>
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;

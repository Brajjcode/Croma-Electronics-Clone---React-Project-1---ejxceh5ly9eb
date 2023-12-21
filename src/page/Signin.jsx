import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link , useNavigate}from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {




  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

//const defaultTheme = createTheme();

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

export default function SignIn() {

  const navigate= useNavigate();

  React.useEffect(()=>{
    const jwtToken =  localStorage.getItem('token');
    if(jwtToken) {
        navigate('/')
    }
} , [])
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

   //const storedUserdata= JSON.parse(localStorage.getItem('userInfo'))||{};

   //if(event.currentTarget.email.value===storedUserdata.email && event.currentTarget.password.value===storedUserdata.password){
      try{
        const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'projectID': 'f104bi07c490', 
          },
          body: JSON.stringify({
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
            appType: 'ecommerce',
          }),
        });

        if(response.ok){
          const responseData= await response.json();
          console.log("response data=>",responseData)
          localStorage.setItem('userToken', responseData.token);
          localStorage.setItem('userdata',JSON.stringify(responseData));
          alert("logged in sucessfully");
           navigate("/", { state: { userloggedin: true } });
        }
      }
      catch(error){ 
             console.log(error);
      }
   // }
    // else{
    //   alert("invalid username or password");
    // }

  };



  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={`/signup`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )};
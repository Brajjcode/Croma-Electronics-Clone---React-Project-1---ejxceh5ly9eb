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

import Toast from 'react-bootstrap/Toast';
import { useState } from 'react';

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
   const [signin,setsignin]=useState(false)
   const[incorrect,setIncorrect]=useState(false)
  React.useEffect(()=>{
    const jwtToken =  localStorage.getItem('token');
    if(jwtToken) {
        navigate('/')
    }
} , [])

setTimeout(()=>{
     setsignin(false)
     setIncorrect(false)
},5000)
  const handleSubmit = async (event) => {
    event.preventDefault();
    
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
       //   console.log("response data=>",responseData)
          localStorage.setItem('userToken', responseData.token);
          localStorage.setItem('userdata',JSON.stringify(responseData.data.user));
        //  alert("logged in sucessfully");    
        setsignin(true)     
           navigate("/", { state: { userloggedin: true } });
           window.location.reload()
        }

        else{
         // alert('Incorrect username or password');
         setIncorrect(true)
         
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
    <>
    <ThemeProvider theme={darkTheme}>
     
{
  signin &&(
    <>
    <Toast variant="dark">
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Signin</strong>
        
      </Toast.Header>
      <Toast.Body>Signedin Sucessfully.</Toast.Body>
    </Toast>

    </>
  )
}
{
    incorrect &&(
      <>
      <div className=' flex items-center justify-center pt-3'>
      <Toast bg='secondary' style={{ zIndex: 1000 }} >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Incorrect</strong>
        
      </Toast.Header>
      <Toast.Body>Incorrect username or Password.</Toast.Body>
    </Toast>
    </div>
      </>
    )
  }
     
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Log in
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to={`/signup`} variant="body2" >
                  {"Don't have an account?" } <span className=' text-blue-600'>Sign up</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  )};
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link,useNavigate} from 'react-router-dom';
 
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

const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export default function SignUp() {

  const navigate= useNavigate();

  const [userData,setUserdata]=React.useState({

    name:'',
    email:'',
    password:'',
    
  });
 
  React.useEffect(()=>{
        const jwtToken= localStorage.getItem('token')
       
        if(jwtToken){

            navigate('/signin');
        }

  },[])

  const handleInputchange=(event)=>{

    const {name,value}= event.target;

    
  if (!name || !value) {
    console.error('Invalid event target:', event.target);
    return;
  }
     setUserdata((prevData)=>({
      ...prevData,
      [name]:value,
      appType: 'ecommerce',

     }))

   //  console.log(userData);
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
   //  console.log(userData)
   if (!userData.password) {
    alert('Please enter a password.');
    return;
  }
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        'projectID':'f104bi07c490'
        },
        body: JSON.stringify({
          ...userData,

        }),
       
      });

      if (response.ok) {
        // API call successful, parse response JSON
        const responseData = await response.json();
       // console.log("responsedata=>",responseData)

        // Store user credentials in local storage
        
        localStorage.setItem('userToken', responseData.token);
       // console.log(userData);
        localStorage.setItem('userInfo' , JSON.stringify(userData))
        alert("Signedup Sucessfully");
        navigate("/signin")


        
        }else {
       // Handle error responses
      // console.error('API call failed:', response.status, response.statusText);
      const errorData = await response.json();
      console.error('API call failed:', response.status, response.statusText, errorData);

      // Display alert for specific error message
      if (errorData.message) {
        alert(`Error: ${errorData.message}`);
      } else {
        alert('An error occurred during signup. Please try again.');
      }
      }
    } catch (error) {
      console.error('An error occurred during the API call:', error);
    }
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });


  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                 // value={userData.name} 
                  autoComplete="username"
                  onChange={handleInputchange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                 // value={userData.email} 
                  onChange={handleInputchange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                //  value={userData.password}
                  onChange={handleInputchange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={`/signin`} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

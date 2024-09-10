import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './Addressform';
import PaymentForm from './Payment';
import Review from './Review';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step,handleFormCompletion) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm  />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}
const isTokenPresent = () => {
  const token = localStorage.getItem('userToken'); // You may need to adjust this based on your authentication setup
  return !!token;
  };
  
  

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [JwtToken, setJwtToken] = React.useState(localStorage.getItem('userToken'));
  const [cartItems, setCartItems] = React.useState([]);
  const [formCompleted, setFormCompleted] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const[id,setid]=useState("");
  const[result,setResult]=useState([]);
  const[cart,setCart]=React.useState([])
  const navigate= useNavigate();

  const handleNext = () => {
    // Checking the form validity before proceeding
    if (isFormValid) {
      setActiveStep(activeStep + 1);
    } else {
      // Display an error message or prevent progression
      alert('Please fill in all required fields.');
    }
  };

  const handleFormCompletion = (isFormValid) => {
    
    setFormCompleted(isFormValid);
    setIsFormValid(isFormValid);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
 
 
  
  const fetchData = async () => {
    try {
      const cartUrl = 'https://academics.newtonschool.co/api/v1/ecommerce/cart';
      const cartResponse = await fetch(cartUrl, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
          projectID: 'f104bi07c490',
        },
      });
      const cartData = await cartResponse.json();
      setCart(cartData)
      setid(cartData.data._id)
      setResult(cartData.results)
      const itemsArray = cartData.data && cartData.data.items ? cartData.data.items : [];
      const total = itemsArray.reduce((acc, prod) => acc + prod.product.price, 0);
      // console.log(cartData) 
      setTotalamount(total);
     
      setCartItems(itemsArray);

    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  React.useEffect(() => {
    if (!isTokenPresent()) {
      // Redirect to the sign-in page if the token is not present
      // You may need to adjust the route based on your application
      navigate('/signin');
    }
    else{
      fetchData();
    }
  }, [JwtToken,navigate]);
  const handlePlaceOrder = async () => {
    const Jwttoken= localStorage.getItem('userToken');
    try {
    //  const productIds = cart.data.map((item) => item.product._id);
 //  const id=cart.data._id
   //   const quantity=cart.results;
      console.log("productids",productIds)
      console.log("Jwt",JwtToken)
      const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/order/convertCartToOrder', {
        method:'POST',
        headers: {
          'Authorization': `Bearer ${Jwttoken}`,
          'Content-Type': 'application/json',
          'projectID': 'f104bi07c490',
         
        },
          body: JSON.stringify({
          "productId": "66d0ccf1a52bc1b7a2ca5480",  
          "quantity": 1,  
          "addressType": "HOME",
          "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "state": "CA",
            "country": "USA",
            "zipCode": "12345",
          },
        
      }),
      });

      if (response.ok) {
        // Handle success, e.g., navigate to a success page
           console.log(response);

        console.log('Order placed successfully!');
      } else {
        // Handle error
        console.log('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }

    try{
      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/`,{
        // mode:'no-cors',
        method:'DELETE',
headers:{
  'Authorization': `Bearer ${JwtToken}`,
  'projectID': 'f104bi07c490',

}

      });
        console.log(response)
        const data= await response.json();
        console.log(data);
       if(response.ok){

        console.log("Cart Cleared")
      
       }

    }
  catch(error){
        console.log(error);
  }

  setTimeout(()=>{
    navigate("/");
  },5000)
  };

console.log("cartItems",cartItems)
console.log("isformvalid",isFormValid)
console.log("cart",cart)
console.log("token",JwtToken)
console.log("id",id)
console.log("result",result)
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        {/* <Toolbar>
           <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography> 
        </Toolbar> */}
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
           {activeStep === 0 && (
            <AddressForm handleFormCompletion={handleFormCompletion} />
            )}
               {activeStep === 1 && (
               <PaymentForm handleFormCompletion={handleFormCompletion} />
           )}
        {activeStep === 2 && <Review />}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeStep !== 0 && (
             <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
               Back
            </Button>
            )}
         <Button
          variant="contained"
        //  onClick={handleNext}
        onClick={() => {
          if (activeStep === steps.length - 1) {
            // If on the last step, call both handleNext and handlePlaceOrder
            handleNext();
            handlePlaceOrder();
          } else {
            // Otherwise, just call handleNext
            handleNext();
          }
        }}
          
          disabled={!isFormValid}  // Disable the button if the form is not valid
          sx={{ mt: 3, ml: 1 }}
          >
          {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
        </Button>
        </Box>
        </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState,useEffect } from 'react';

export default function PaymentForm({ handleFormCompletion }) {
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
        saveCard: false,
      });
     
      useEffect(() => {
        localStorage.setItem('cardData', JSON.stringify(formData));
        checkFormCompletion();
      }, [formData]);
    
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
        if (name === 'cardName' || name === 'cardNumber' || name === 'expDate' || name === 'cvv') {
          checkFormCompletion();
        }

      };
      const checkFormCompletion = () => {
        // Checking if all required fields are filled
        const isFormFilled =
          formData.cardName.trim() !== '' &&
          formData.cardNumber.trim() !== '' &&
          formData.expDate.trim() !== '' &&
          formData.cvv.trim() !== '';
    
        // Passed the form completion status to the parent component
        handleFormCompletion(isFormFilled);
      };
  
   console.log("formdata",formData)
    
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
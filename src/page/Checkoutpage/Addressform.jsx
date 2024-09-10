  import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme } from '@mui/material';
import { useState,useEffect } from 'react';
export default function AddressForm({handleFormCompletion}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        saveAddress: false,
      });
   //   const [formCompleted, setFormCompleted] = useState(false);
   const [validationMessages, setValidationMessages] = useState({
    zip: '',
  });
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timerId = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timerId);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedFormData = useDebounce(formData, 500);

      useEffect(() => {
        localStorage.setItem('addressFormData', JSON.stringify(formData));
           checkFormCompletion();
      }, [formData]);
    
      const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));

        if (name === 'zip') {
          validateInput(name, newValue);
        }
      };
      const validateInput = (name, value) => {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [name]: '',
        }));
    
        switch (name) {
          case 'zip':
            if (value.length !== 6) {
              setValidationMessages((prevMessages) => ({
                ...prevMessages,
                [name]: 'Zip code must be 6 digits',
              }));
            }
            break;
          default:
            break;
        }
      };
      const checkFormCompletion = () => {
        // Checking if all required fields are filled
        const isFormFilled =
          formData.firstName.trim() !== '' &&
          formData.lastName.trim() !== '' &&
          formData.address1.trim() !== '' &&
          formData.city.trim() !== '' &&
          formData.zip.trim() !== '' &&
          formData.country.trim() !== '';
    
        // Updated the form completion status
      //  setFormCompleted(isFormFilled);
    
        // Passed the form completion status to the parent component
        handleFormCompletion(isFormFilled);
      };




  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleInputChange}
        
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleInputChange}
        
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleInputChange}
        
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleInputChange}
        
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
             required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
        
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleInputChange}
            helperText={validationMessages.zip}
            error={!!validationMessages.zip}
        
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleInputChange}
        
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
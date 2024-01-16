// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { useState,useEffect, useRef } from 'react';

// export default function PaymentForm({ handleFormCompletion }) {
//     const [formData, setFormData] = useState({
//         cardName: '',
//         cardNumber: '',
//         expDate: '',
//         cvv: '',
//         saveCard: false,
//       });
     
//       useEffect(() => {
//         localStorage.setItem('cardData', JSON.stringify(formData));
//         checkFormCompletion();
//       }, [formData]);

//       // const debounce = (func, delay) => {
//       //   let timer;
//       //   return function (...args) {
//       //     clearTimeout(timer);
//       //     timer = setTimeout(() => func.apply(... args), delay);
//       //   };
//       // };

//       const useDebounce = (func, delay) => {
//         const debouncedFunction = useRef(
//           debounce((...args) => {
//             func(...args);
//           }, delay)
//         ).current;
      
//         return debouncedFunction;
//       };

//       //const handleInputChangeDebounced = debounce(handleInputChange, 500);
//       const handleInputChangeDebounced = useDebounce(handleInputChange, 500);
    
//     const handleInputChange = (event) => {
//         const { name, value, type, checked } = event.target;
//         const newValue = type === 'checkbox' ? checked : value;
    
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: newValue,
//         }));
//         if (name === 'cardName' || name === 'cardNumber' || name === 'expDate' || name === 'cvv') {
//           checkFormCompletion();
//         }

//         if (name === 'cardNumber' && value.length !== 16) {
         
//           alert('Card number must be 16 digits');
          
//         }
    
//         // Validate CVV length
//         if (name === 'cvv' && value.length !== 3) {
//           alert('CVV must be 3 digits');
         
//         }
    
//         // Validate expiration date format
//         if (name === 'expDate' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
//           alert('Expiration date must be in MM/YY format');

//         }

//       };
//       const checkFormCompletion = () => {
//         // Checking if all required fields are filled
//         const isFormFilled =
//           formData.cardName.trim() !== '' &&
//           formData.cardNumber.trim() !== '' &&
//           formData.expDate.trim() !== '' &&
//           formData.cvv.trim() !== '';
    
//         // Passed the form completion status to the parent component
//         handleFormCompletion(isFormFilled);
//       };
  
//    console.log("formdata",formData)
    
//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Payment method
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <TextField
//             required
//             id="cardName"
//             name="cardName"
//             label="Name on card"
//             fullWidth
//             autoComplete="cc-name"
//             variant="standard"
//             onChange={handleInputChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             required
//             id="cardNumber"
//             name="cardNumber"
//             label="Card number"
//             fullWidth
//             autoComplete="cc-number"
//             variant="standard"
//             onChange={handleInputChangeDebounced}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             required
//             id="expDate"
//             name="expDate"
//             label="Expiry date"
//             fullWidth
//             autoComplete="cc-exp"
//             variant="standard"
//             onChange={handleInputChangeDebounced}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             required
//             id="cvv"
//             name="cvv"
//             label="CVV"
//             helperText="Last three digits on signature strip"
//             fullWidth
//             autoComplete="cc-csc"
//             variant="standard"
//             onChange={handleInputChangeDebounced}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <FormControlLabel
//             control={<Checkbox color="secondary" name="saveCard" value="yes" />}
//             label="Remember credit card details for next time"
//           />
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// }
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect, useRef } from 'react';

export default function PaymentForm({ handleFormCompletion }) {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveCard: false,
  });

  const [validationMessages, setValidationMessages] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
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
    localStorage.setItem('cardData', JSON.stringify(debouncedFormData));
    checkFormCompletion();
  }, [debouncedFormData]);

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    if (name === 'cardName' || name === 'cardNumber' || name === 'expDate' || name === 'cvv') {
      validateInput(name, newValue);
    }
  }

  function validateInput(name, value) {
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: '',
    }));

    switch (name) {
      case 'cardNumber':
        if (value.length !== 16) {
          setValidationMessages((prevMessages) => ({
            ...prevMessages,
            [name]: 'Card number must be 16 digits',
          }));
        }
        break;
      case 'cvv':
        if (value.length !== 3) {
          setValidationMessages((prevMessages) => ({
            ...prevMessages,
            [name]: 'CVV must be 3 digits',
          }));
        }
        break;
      case 'expDate':
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          setValidationMessages((prevMessages) => ({
            ...prevMessages,
            [name]: 'Expiration date must be in MM/YY format',
          }));
        }
        break;
      default:
        break;
    }
  }

  const checkFormCompletion = () => {
    const isFormFilled =
      formData.cardName.trim() !== '' &&
      formData.cardNumber.trim() !== '' &&
      formData.expDate.trim() !== '' &&
      formData.cvv.trim() !== '';

    handleFormCompletion(isFormFilled);
  };

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
            helperText={validationMessages.cardName}
            error={!!validationMessages.cardName}
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
            helperText={validationMessages.cardNumber}
            error={!!validationMessages.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date (MM/YY)"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={handleInputChange}
            helperText={validationMessages.expDate}
            error={!!validationMessages.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
         //   helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleInputChange}
            helperText={validationMessages.cvv}
            error={!!validationMessages.cvv}
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

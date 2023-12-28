import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';


const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
    const [cartItems, setCartItems] = useState([]);
    const [totalamount,setTotalamount]=useState(0);
 const token = localStorage.getItem('userToken');
 const address=  JSON.parse(localStorage.getItem('addressFormData'));
 const cardetails= JSON.parse(localStorage.getItem(''))
 const {id}= useParams();
 console.log("addressFirstname=>",address)
    // useEffect(() => {

      
    //     // Define the API endpoint and headers
    //     const apiUrl = 'https://academics.newtonschool.co/api/v1/ecommerce/cart';
    //     const headers = {
    //       Authorization: `Bearer ${token} `,
    //       projectID: 'f104bi07c490',
    //     };
    
    //     // Fetch data from the API
    //     fetch(apiUrl, { headers })
    //       .then((response) => response.json())
    //       .then(({data}) => {
    //         // Assuming the API response has a 'cartItems' property containing an array of items
    //         const itemsArray = data && data.items ? data.items : [];
    //         const total = itemsArray.reduce((acc, prod) => acc + prod.product.price, 0);   
    //         setTotalamount(total);
    //         setCartItems(itemsArray);
    //       })
    //       .catch((error) => console.error('Error fetching data:', error));
    //   }, []);
     // console.log("cartItems in review",cartItems);

     useEffect(()=>{
      const  fetchData= async()=>{

        if(id){
          //const productUrl=
          const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,{
            method: 'GET',
            headers:{
                'projectID':'f104bi07c490'
                       }
         });
         const productData = await response.json();

        setTotalamount(productData.data.price);
        setCartItems([{ product: productData.data }]);

        }
      else{
        const cartUrl = 'https://academics.newtonschool.co/api/v1/ecommerce/cart';
        const cartResponse = await fetch(cartUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: 'f104bi07c490',
          },
        });
        const cartData = await cartResponse.json();

        const itemsArray = cartData.data && cartData.data.items ? cartData.data.items : [];
        const total = itemsArray.reduce((acc, prod) => acc + prod.product.price, 0);

        setTotalamount(total);
        setCartItems(itemsArray);

      }

      };
      fetchData();
     },[id,token]);
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((prod) => (
          <ListItem key={prod.product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={prod.product.name} secondary="" />
            <Typography variant="body2">{prod.product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalamount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          
          <Typography gutterBottom>{address.firstName+" "+ address.lastName}</Typography>
          <Typography gutterBottom>{address.address1}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
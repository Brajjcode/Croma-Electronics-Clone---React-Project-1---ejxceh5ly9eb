import React from 'react'
import headphone from "../components/Assets/271807_xhhqk6.webp"
//import CartCard from '../components/imageurls/CartCard'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useState,useEffect } from 'react'
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from './Checkoutpage/CheckoutForm';
import emptycart from "../components/Assets/empty cart.gif"
import "../styles/Addtocart.css"
const Addtocart = () => {
    const [cartproducts,setcartproducts]=useState([]);
    const [total,setotal]=useState(0)
    const [qty,setqty]= useState(1);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const[totalprice,setTotalprice]=useState(0);
    const [shippingCost, setShippingCost] = useState(10);
    const[totalaftershipping,setTotalaftershipping]= useState(0);
    const navigate=useNavigate()
    const JwtToken=localStorage.getItem('userToken');
    
        
        console.log(JwtToken)

   
      
        
       const fetchcartproducts=async()=>{
        try{
        const response= await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart`,{
          method:'GET',
          headers:{
            'Authorization': `Bearer ${JwtToken}`,
            'projectID': 'f104bi07c490',

          }

        })
        if(response.ok){
           const {data}= await response.json();
           console.log("data",data);
           const itemsArray = data && data.items ? data.items : [];

           setSelectedProduct(itemsArray);
           const total = itemsArray.reduce((acc, prod) => acc + prod.product.price, 0);         
           setTotalprice(total)
           const totalWithShipping = total + shippingCost;
           setTotalaftershipping(totalWithShipping);

           setIsLoading(false);
           
        }
      }
      catch(error){
        console.log(error);
      }
        }    
  // USing effect to fetch product   
        useEffect(() => {
          if (!JwtToken) {
            navigate('/Signin');
          } else {
            fetchcartproducts();
          }
        }, [JwtToken, navigate]);
    



    // removing Items from cart  
        const removeItem=async(prodId)=>{
          console.log(prodId)
          try{
          const response= await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${prodId}`,{
            
          method:'DELETE',
          headers:{
            'Authorization': `Bearer ${JwtToken}`,
            'projectID': 'f104bi07c490',

          }
          
            })

            if(response.ok){
              fetchcartproducts();
            }
            else{
              console.log("error removing items from cart")
            }
          } 
          catch(error)
          {
            console.log("error removing items from cart",error)
          }
        
        }
        //adding to wishlist

       async function wishlist(id){
        try{
        
         const result = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${id}`,{
           method:'PATCH',
           headers:{
            'Authorization': `Bearer ${JwtToken}`,
            'projectID': 'f104bi07c490',
           }
           
          //console.log(id);
         })
            console.log(id);
            console.log(result);
        }
        catch(error){
          console.log(error);
        }
        }
        // remove all items  
        const removeAllitems=async()=>{
              try{
                const response = await fetch(`http://academics.newtonschool.co/api/v1/ecommerce/cart/`,{
                  mode:'no-cors',
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
                  alert("cart empty add products ");
                }

              }
            catch(error){
                  console.log(error);
            }

        }
      



      console.log("selectedproduc",selectedProduct)

  return (
    <>
    <div className=' w-full'>
    {Array.isArray(selectedProduct) && selectedProduct.length > 0 && (
    <div className=' flex justify-end mt-4'>
    <Button variant="primary" className=' w-40 h-10' onClick={()=>removeAllitems()}>Clear Cart</Button>

    </div>
    )}
    <div className=' hidden md:flex flex-row justify-center gap-5 w-11/12'>
    {isLoading ? (
          <p>...Loading</p>
        ) : (
          
          <div className='flex flex-col items-center  w-4/5 h-auto px-5 py-4 '>
            {Array.isArray(selectedProduct) && selectedProduct.length > 0 ? (
              selectedProduct.map((prod) => (
                <div className=''>
                <Card className=' max-h-52 max-w-2xl mt-20 static' key={prod.product._id}>
                  <Card.Body className='flex flex-row justify-around'>
                    <Row>
                      <Col xs={10} md={7}>
                        <Image src={prod.product.displayImage} square />
                      </Col>
                    </Row>
                    <div>
                      <Card.Text className=' text-left'>
                        {prod.product.name}
                      </Card.Text>
                      <div className=' flex flex-row gap-2 m-3 '>
                        <Button variant="primary" className=' w-40 h-10' onClick={()=>wishlist(prod.product._id)}>Add to wishlist</Button>
                        <Button variant="primary" className=' w-40 h-10' onClick={() => removeItem(prod.product._id)}>Remove</Button>
                      </div>
                    </div>
                    <Card.Title className=' text-sm'>₹{prod.product.price.toFixed(2).replace(/\d(?=(\d{4})+\.)/g, '$&,')}</Card.Title>
                  </Card.Body>
                </Card>
                </div>
              ))
            ) : (
              <img src={emptycart}></img>
            )}
          </div>
          
        )}

{Array.isArray(selectedProduct) && selectedProduct.length > 0 && (
<div className='max-w-xl max-h-60 mt-20' >
<Card>
<Card.Header>Order Summary</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
         <div className=' flex justify-around gap-44'>
          <span>Total Price</span>
          <span>₹{totalprice.toFixed(2).replace(/\d(?=(\d{4})+\.)/g, '$&,')}</span>          
         </div>
         <div className=' flex justify-around gap-44'>
          <span>Discounted price</span>
          <span>₹0</span>          
         </div>
         <div className=' flex justify-around gap-44'>
          <span>Shipping charges</span>
          <span>₹{shippingCost}</span>          
         </div>

        </Card.Text>
        <div className=' flex flex-row items-center gap-44 mt-7'>
     <Link to={`/Checkout`}> <Button variant="primary">Checkout</Button></Link>
        <div className=' flex justify-around gap-2'>
          <span>Total:</span>
          <span>₹{totalaftershipping.toFixed(2).replace(/\d(?=(\d{4})+\.)/g, '$&,')}</span>          
         </div>
        </div>
      </Card.Body>
    </Card>
     </div>
)}
</div>
{/* for mobile */}
<div className='md:hidden'>
<div className=' cart flex flex-col justify-center gap-5 w-11/12'>
    {isLoading ? (
          <p>...Loading</p>
        ) : (
          
          <div className=' flex flex-col items-center w-4/5 h-auto px-5 py-4 '>
            {Array.isArray(selectedProduct) && selectedProduct.length > 0 ? (
              selectedProduct.map((prod) => (
                <div className=' ml'>
                <Card className=' max-h-52 w-screen ml-16 static' key={prod.product._id}>
                  <Card.Body className='flex flex-row items-center'>
                    <Row>
                      <Col xs={8} md={7}>
                        <Image src={prod.product.displayImage} square  />
                      </Col>
                    </Row>
                    <div>
                      <Card.Text className='text-left'>
                        {prod.product.name}
                      </Card.Text>
                      <div className=' flex flex-row gap-2 m-3 '>
                        <Button variant="primary" className=' w-40 h-10' onClick={()=>alert("Wishlist feature Coming soon")}>Add to wishlist</Button>
                        <Button variant="primary" className=' w-40 h-10' onClick={() => removeItem(prod.product._id)}>Remove</Button>
                      </div>
                    </div>
                    <Card.Title className=' text-sm'>₹{prod.product.price.toFixed(2).replace(/\d(?=(\d{4})+\.)/g, '$&,')}</Card.Title>
                  </Card.Body>
                </Card>
                </div>
              ))
            ) : (
              <img src={emptycart}></img>
            )}
          </div>
          
        )}

{Array.isArray(selectedProduct) && selectedProduct.length > 0 && (
<div className='max-w-xl max-h-60 mt-20' >
<Card>
<Card.Header>Order Summary</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
         <div className=' flex justify-around gap-44'>
          <span>Total Price</span>
          <span>₹{totalprice.toFixed(2).replace(/\d(?=(\d{4})+\.)/g, '$&,')}.00</span>          
         </div>
         <div className=' flex justify-around gap-44'>
          <span>Discounted price</span>
          <span>₹0</span>          
         </div>
         <div className=' flex justify-around gap-44'>
          <span>Shipping charges</span>
          <span>₹{shippingCost}</span>          
         </div>

        </Card.Text>
        <div className=' flex flex-row items-center gap-44 mt-7'>
     <Link to={`/Checkout`}> <Button variant="primary">Checkout</Button></Link>
        <div className=' flex justify-around gap-2'>
          <span>Total:</span>
          <span>₹{totalaftershipping.toFixed(2).replace(/\d(?=(\d{4})+\.)/g, '$&,')}</span>          
         </div>
        </div>
      </Card.Body>
    </Card>
     </div>
)}
</div>
</div>

</div>
    </>
  )
}

export default Addtocart

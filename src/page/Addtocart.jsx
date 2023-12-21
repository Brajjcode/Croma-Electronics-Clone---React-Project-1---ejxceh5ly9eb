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
import { useNavigate } from 'react-router-dom';
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
            Console.log("error removing items from cart",error)
          }
        
        }
          
      



      console.log("selectedproduc",selectedProduct)

  return (
    <>
    <div className=' flex flex-row justify-center gap-5 '>
   {isLoading?(<p>...Loading</p>):(<div className=' flex flex-col items-center'> 

{Array.isArray(selectedProduct) && selectedProduct.map((prod)=>(

<Card className=' max-h-52 max-w-2xl mt-20 static'>

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
<Button variant="primary" className=' w-40 h-10'>Add to wishlist</Button>
<Button variant="primary" className=' w-40 h-10' onClick={()=>removeItem(prod.product._id)}>Remove</Button>
</div>
</div>




<Card.Title className=' text-sm'>{prod.product.price}</Card.Title>

</Card.Body>
</Card>
  
))}

</div>
)}
<div className='max-w-xl max-h-60 mt-20' >
<Card>
<Card.Header>Order Summary</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
         <div className=' flex justify-around gap-44'>
          <span>Total Price</span>
          <span>${totalprice}</span>          
         </div>
         <div className=' flex justify-around gap-44'>
          <span>Discounted price</span>
          <span>$0</span>          
         </div>
         <div className=' flex justify-around gap-44'>
          <span>Shipping charges</span>
          <span>${shippingCost}</span>          
         </div>

        </Card.Text>
        <div className=' flex flex-row items-center gap-44 mt-7'>
        <Button variant="primary">Checkout</Button>
        <div className=' flex justify-around gap-2'>
          <span>Total:</span>
          <span>${totalaftershipping}</span>          
         </div>
        </div>
      </Card.Body>
    </Card>
     </div>
</div>
    </>
  )
}

export default Addtocart

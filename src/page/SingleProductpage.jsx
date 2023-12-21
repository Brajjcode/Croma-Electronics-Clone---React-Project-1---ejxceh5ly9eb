import React from 'react'
import headphones from "../components/Assets/271807_xhhqk6.webp"
import Box from '../components/Box/box'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const SingleProductpage = () => {

   const {id}= useParams();
   const[data,setdata]= useState([]);
   const [imageData,setImage]=useState('')
   const [loader,setLoader]= useState(false)
   const navigate= useNavigate();

   useEffect(()=>{
    const getData=async ()=>{
      setLoader(true)
         const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,{
            method: 'GET',
            headers:{
                'projectID':'f104bi07c490'
                       }
         });
         const Jsonresponse= await response.json();
         console.log(Jsonresponse);
         setdata(Jsonresponse.data);
         setLoader(false)
    }
    getData();
   },[id])
 
   const addproduct= async(prod)=>{
    const jwtToken = localStorage.getItem('userToken');
    
       if(!jwtToken){
             
        navigate('/signin')
        return;
       }
   //   const JwtToken= 'your jwt token';
         console.log("productid=>",prod._id)
      const projectID='f104bi07c490';
      try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${prod._id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'projectID': projectID,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity: 1, // You can adjust the quantity as needed
          }),
        });
  
        if (response.ok) {
          alert('Item added to the cart successfully');
        } else {
          alert('Failed to add item to the cart');
        }
      } catch (error) {
        console.error('Error adding item to the cart:', error);
      }
   }


   const handlebuynow=()=>{
    const jwtToken=localStorage.getItem('userToken');
    if(!jwtToken){
      navigate('/signin')
      return;
    }
   
   navigate('#')
   }
  return (
    <>{loader?(
      <div className=' text-white'>Loading....</div>
    ):(

    
    <div className='container'>
    <div className="flex flex-row items-center justify-center p-40 gap-5">
    
      
    <img src={imageData?imageData:data.displayImage}class="thumbnail rounded mx-auto d-block object-scale-down h-80 w-96" alt="..."/>
    <div className="content text-white ">
        <h1 className=' font-semibold'>{data.name}</h1>

        <div className=' p-2'>Price: ${data.price}</div>


         <ol className="border-2 border-slate-700 p-1">
         <h2 className=' p-1'> Key Features:</h2>
         {data.features && data.features.map((item)=>(
        
            <li>{item}</li>
        
      
))}
   </ol>
        <Stack direction="column" spacing={2} className=' p-4'>
         <Button variant="contained" color="success" onClick={()=>handlebuynow()}> Buy Now </Button>
         <Button variant="contained" color="success" onClick={()=>addproduct(data)}> Add to cart </Button>
         </Stack>
    </div>
     </div>
     <div className='flex flex-row items-center w-52 px-7'>
        {data.images && data.images.map((image)=>(
    <img src={image}class="thumbnail rounded mx-auto d-block object-scale-down h-80 w-96 border-2 border-slate-700 p-1"  onClick={()=>setImage(image)} alt="..."/>
       )) }
       {/* <img src={data.displayImage}class="thumbnail rounded mx-auto d-block object-scale-down h-80 w-96 border-2 border-slate-700 p-1"  onClick={()=>setImage(data.displayImage)} alt="..."/> */}
    </div>

    </div>
    
)}
    </>
  )
}

export default SingleProductpage

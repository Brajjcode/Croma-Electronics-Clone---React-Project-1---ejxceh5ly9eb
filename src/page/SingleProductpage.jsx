import React from 'react'
import headphones from "../components/Assets/271807_xhhqk6.webp"
//import Box from '../components/Box/box'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import star from '../components/Assets/icons8-star-filled-24.png'
import Box from '../components/Box/box';

const SingleProductpage = () => {

   const {id}= useParams();
   const[data,setdata]= useState([]);
   const [imageData,setImage]=useState('')
   const [loader,setLoader]= useState(false)
 const  [reviews,setreviews]= useState([])
   const navigate= useNavigate();
   

   var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 683,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
   
   
    
   };
 
 
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

         const reviewResponse = await fetch (`https://academics.newtonschool.co/api/v1/ecommerce/review/${id}`,{
          method: 'GET',
                headers:{
                    'projectID':'f104bi07c490'
                           }
             });

      const reviewresponsejson = await reviewResponse.json();
      console.log("review response",reviewresponsejson);
      setreviews(reviewresponsejson.data)
       

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


   const handlebuynow=(prod)=>{
    const jwtToken=localStorage.getItem('userToken');
    if(!jwtToken){
      navigate('/signin')
      return;
    }
   
   navigate(`/Checkout/${prod._id}`)
   }
   console.log("reviews",reviews)

  return (
    <>{loader?(
      <div className=' text-white'>Loading....</div>
    ):(
         

<Box>
    <div className='container'>
    <div className="hidden md:flex flex-row items-center justify-center p-40 gap-5">
    
      
    <img src={imageData?imageData:data.displayImage}class="thumbnail rounded mx-auto d-block object-scale-down h-80 w-96" alt="..."/>
    <div className="content text-white ">
        <h1 className=' font-semibold'>{data.name}</h1>

        <div className=' p-2'>Price: ₹{data.price}.00</div>


         <ol className="border-2 border-slate-700 p-1">
         <h2 className=''>Key Features:</h2>
         {data.features && data.features.map((item)=>(
        
            <li>{item}</li>
        
      
))}
   </ol>
        <Stack direction="column" spacing={2} className=' p-4'>
         <Button variant="contained" color="success" onClick={()=>handlebuynow(data)}> Buy Now </Button>
         <Button variant="contained" color="success" onClick={()=>addproduct(data)}> Add to cart </Button>
         </Stack>
    </div>

    
     </div>
     <div className=' md:hidden'>

      {/* for mobile */}
      <div className="flex flex-row items-center justify-center p-40 gap-5">
    
      
    <img src={imageData?imageData:data.displayImage}class=" rounded mx-auto d-block object-scale-down h-80 w-96" alt="..."/>
    <div className="content text-white ">
        <h1 className=' font-semibold'>{data.name}</h1>

        <div className=' p-2'>Price: ₹{data.price}.00</div>


         <ol className="border-2 border-slate-700 p-1 w-60">
         <h2 
         className=''>Key Features:</h2>
         {data.features && data.features.map((item)=>(
        
            <li>{item}</li>
        
      
))}
   </ol>
        <Stack direction="column" spacing={2} className=' p-4'>
         <Button variant="contained" color="success" onClick={()=>handlebuynow(data)}> Buy Now </Button>
         <Button variant="contained" color="success" onClick={()=>addproduct(data)}> Add to cart </Button>
         </Stack>
    </div>

    
     </div>


     </div>

     <div >
      <Box>
      <div className=' mb-28'>
    <Slider {...settings}>
        {data.images && data.images.map((image)=>(
    <img src={image} className="thumbnail rounded mx-auto d-block object-scale-down h-80 w-96 border-2 border-slate-700 p-1" onClick={()=>setImage(image)} alt="..."/>
       )) }
       </Slider>
       </div>
       </Box>
       {/* <img src={data.displayImage}class="thumbnail rounded mx-auto d-block object-scale-down h-80 w-96 border-2 border-slate-700 p-1"  onClick={()=>setImage(data.displayImage)} alt="..."/> */}

       {/* Display Reviews */}

       <div className="reviews-container mb-9">
          <h2>Reviews</h2>
          <ul className='border-2 border-slate-700 p-1'>
            {reviews.slice(0,5).map((review)=>(
             <li key={review._id}>
            <p className=' text-white '>  <strong>{review.user}</strong>:{review.text} </p>
            <p className=' text-white flex flex-row'>Rating: <img src={star} style={{ marginLeft: '0.2rem', height:'0.8rem' }}/><span className=' text-green-300'>{review.ratings}/5</span></p>

             </li>
              
            ))}
          </ul>
       </div>
       <div>

       </div>
    </div>

    </div>

</Box>
    
 )}
    </>
  )
}

export default SingleProductpage

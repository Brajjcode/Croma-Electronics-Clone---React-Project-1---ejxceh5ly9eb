import React from 'react'
import headphones from "../components/Assets/271807_xhhqk6.webp"
import Box from '../components/Box/box'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
const SingleProductpage = () => {

   const {id}= useParams();
   const[data,setdata]= useState([]);
   //const [image,setImage]=useState('')

   useEffect(()=>{
    const getData=async ()=>{
         const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,{
            method: 'GET',
            headers:{
                'projectID':'f104bi07c490'
                       }
         });
         const Jsonresponse= await response.json();
         console.log(Jsonresponse);
         setdata(Jsonresponse.data);
    }
    getData();
   },[id])
  return (
    <>
    <div className='container'>
    <div className="flex flex-row items-center justify-center p-40 gap-5">
    
      
    <img src={data.displayImage}class="thumbnail rounded mx-auto d-block object-scale-down h-80 w-96" alt="..."/>
    <div className="content text-white ">
        <h1 className=' font-semibold'>{data.name}</h1>

        <div className=' p-2'>Price: ${data.price}</div>


         <ol className="border-2 border-slate-700 p-1">
         <h2 className=' p-1'> Key Features:</h2>
         { data.features.map((item)=>(
        
            <li>{item}</li>
        
      
))}
   </ol>
        <Stack direction="column" spacing={2} className=' p-4'>
         <Button variant="contained" color="success"> Buy Now </Button>
         <Button variant="contained" color="success"> Add to cart </Button>
         </Stack>
    </div>
     </div>
     <div className='flex flex-row items-center w-52 px-7'>
        {data.images.map((image)=>(
    <img src={image}class="thumbnail rounded mx-auto d-block object-scale-down h-80 w-96 border-2 border-slate-700 p-1" alt="..."/>
       )) }
    </div>

    </div>
    </>
  )
}

export default SingleProductpage

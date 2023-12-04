import React from 'react'

import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import ImgMediaCard from '../components/imageurls/imagecard';
const SearchPage = () => {

    const {searchterm}= useParams();

    const [result,setresult]=useState([]);

   useEffect(()=>{
     const getSearchResult= async()=>{
        const response= await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"description":"${searchterm}"}`,{
            method:'GET',
           headers:{
       'projectID':'f104bi07c490'
              }
        })
        const data=await response.json();
   console.log(data);
 setresult(data.data);
     }

     getSearchResult();
   },[searchterm])
   
  return (
   <>
        <div>
        <h2 className='text-2xl text-white'>{searchterm} result</h2>
        
        <div className='flex flex-wrap gap-2'>
       
          {result.map((product)=>(
            <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/>
          ))}
     
        </div>
        
       
      </div>
   </>
  )
}

export default SearchPage

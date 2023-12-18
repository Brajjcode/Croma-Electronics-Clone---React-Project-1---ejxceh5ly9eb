import React from 'react'
import { useActionData, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import ImgMediaCard from '../components/imageurls/imagecard';
const Dropdownpage = () => {
  
    const [categories,setCategoriesresult]= useState([])
  const {seletedterm}= useParams();
  console.log(seletedterm)
  
 useEffect(()=>{
        const getCategories= async ()=>{
            const responsecat = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"${seletedterm}"}`, {
                method: 'GET',
                headers: {
               'projectID': 'f104bi07c490'
                 }
               });
            
               const categoryData = await responsecat.json();
               console.log(categoryData)
              setCategoriesresult(categoryData.data);
        }
     getCategories();
    },[seletedterm])
  return (
    <div>
        hello
         <div>
        <h2 className='text-2xl text-white'>{seletedterm} result</h2>
        
        <div className='flex flex-wrap gap-2 items-center justify-center'>
       
          {categories.map((product)=>(
            <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/>
          ))}
     
        </div>
        
       
      </div>  
    </div>
  )
}

export default Dropdownpage

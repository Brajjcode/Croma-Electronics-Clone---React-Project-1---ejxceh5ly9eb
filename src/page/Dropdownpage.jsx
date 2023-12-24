import React from 'react'
import { useActionData, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import ImgMediaCard from '../components/imageurls/imagecard';
import Button from '@mui/material/Button';
const Dropdownpage = () => {
  
    const [categories,setCategoriesresult]= useState([])
  const {seletedterm}= useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [Page, setPage] = useState(1);
  console.log(seletedterm)
  
 useEffect(()=>{
        const getCategories= async ()=>{
          try{
            const responsecat = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10 &page=${Page}&filter={"subCategory":"${seletedterm}"}`, {
                method: 'GET',
                headers: {
               'projectID': 'f104bi07c490'
                 }
               });
            if(responsecat.ok){
              const categoryData = await responsecat.json();
               console.log(categoryData)
               setCategoriesresult((prevData)=>[...prevData,...categoryData.data]);
                 setIsFetching(false)
            }
               else{
                setIsFetching(false);
                console.error('Failed to fetch data');
               }

        }
        catch(error){
          setIsFetching(false);
        console.error('Error:', error);


        }
      }
     getCategories();
    },[seletedterm,Page])

    function viewMore(){
      setPage(Page+1);
    }

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
      <div className=' flex items-center justify-center'>
        <Button variant="outlined"onClick={()=>viewMore()}  disabled={isFetching}>View More</Button>
        </div>
    </div>
  )
}

export default Dropdownpage

import React from 'react'



import { IoPencil } from 'react-icons/io5'
import { MdLocationOn } from 'react-icons/md'
import headerImage from "../components/Assets/HP_BFS_21Nov2023_zqffhz.webp"
import offer1 from "../components/Assets/offer1.png"
import mobileoffer from "../components/Assets/offer1Mobile.png"
import Box from "../components/Box/box"
import Imagecard from '../components/imageurls/imagecard'


import ImgMediaCard from '../components/imageurls/imagecard'
import Sliderauto from '../components/sliderauto/sliderauto'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import "./home.css"
import DynamicSelect from '../components/dropdown/dropdown';
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'



const Home = () => {
  const [dealoftheday,setDealoftheday]=useState([]);
  const[trendingproducts,setTrendingproducts]=useState([]);
   const[television,setTelevision]=useState([])
   
   const[mobile,setmobile]=useState([]);
   

   



const  fetchProducts=async(url,setstate,page)=>{
 const response=await fetch(`${url}&page=${page}`,{
   method:'GET',
   headers:{
       'projectID':'f104bi07c490'
   }
 });
 const data=await response.json();
   console.log(data);
 setstate((prevData)=>[...prevData,...data.data]);
 
};





    const handleSearch = async () => {
  
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"price":-1}&sellerTag=best seller', setDealoftheday);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"rating":-1}&sellerTag=trending', setTrendingproducts);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"tv"}', setTelevision);
        // fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products', setcategory, pagecategories);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"mobile"}', setmobile);
      
    };

  
useEffect(()=>{
  handleSearch()
},[])
 




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



  return (
    <>
    <div>
      <div className="flex items-center gap-2 md:hidden 10 bg-black text-white">
        <MdLocationOn className='text-xl' />
        <p className='whitespace-nowrap text-sm'>Mumbai 400049</p>
        <IoPencil className='text-xs' />
    </div>
    <div>
      <img src={headerImage}/>
    </div>
    
    <div className='p-5'>
        <img src={offer1} className='rounded-md overflow-hidden hidden md:block'/>
        <img src={mobileoffer} className='rounded-md overflow-hidden block md:hidden'/>

    </div>

<Box>
<section className="container">
  <div className='container-slide'>
  <div className='sliders'>
   
        
      <div>
        <h2 className='text-2xl text-white'>Deal of the day</h2>
        
        <div >
        <Slider {...settings}>
          {dealoftheday.map((product)=>(
     <Link to={`/singleproduct/${product._id}`} > <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/></Link>
          ))}
          
     </Slider>
        </div>
        
       
      </div>
  
  
  <div >
        <h2 className='text-2xl text-white'>Trending</h2>
        <div>
          <Slider {...settings}>
          {trendingproducts.map((product)=>(
       <Link to={`/singleproduct/${product._id}`} >   <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/> </Link>  
          ))}    
       </Slider>
        </div>
        
      </div>
  
      <div >
        <h2 className='text-2xl text-white'>Televisions</h2>
        <div>
          <Slider {...settings}>
          {television.map((product)=>(
        <Link to={`/singleproduct/${product._id}`} >  <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/> </Link>
          ))}    
       </Slider>
        </div>
     
      </div>
  
      <div >
        <h2 className='text-2xl text-white'>Mobiles</h2>
        <div>
          <Slider {...settings}>
          {mobile.map((product)=>(
    <Link to={`/singleproduct/${product._id}`} > <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/> </Link>
          ))}    
       </Slider>
        </div>
        </div>
       
        
    
      
          
   </div>
   </div>
</section>
   </Box>
  
    </div>
    </>
  )
}

export default Home

import React from 'react'



import { IoPencil } from 'react-icons/io5'
import { MdLocationOn } from 'react-icons/md'
import headerImage from "../components/Assets/HP_DealsCorner_GIF_Compressed_8Dec2023_gazl4l.gif"
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
import { useLocation } from 'react-router-dom'
import highlights1 from "../components/Assets/highlights1_720.png";
import highlights2 from "../components/Assets/highlights2_720.png";
import highlights3 from "../components/Assets/highlights3_720.png";
import highlights4 from "../components/Assets/highlights4_720.png";
import highlights5 from "../components/Assets/highlights5_720.png";
import highlights6 from "../components/Assets/highlights6_720.png";
import Loader from '../components/imageurls/Loader'
//import  {Loader} from 'rsuite'


const Home = () => {
  const [dealoftheday,setDealoftheday]=useState([]);
  const[trendingproducts,setTrendingproducts]=useState([]);
   const[television,setTelevision]=useState([])
   
   const[mobile,setmobile]=useState([]);
   const [cardLoader,setLoader]= useState(false);
   

      const location=useLocation();

   console.log(location);




const  fetchProducts=async(url,setstate,page)=>{

setLoader(true);
 const response=await fetch(`${url}&page=${page}`,{
   method:'GET',
   headers:{
       'projectID':'f104bi07c490'
   }
 });
 const data=await response.json();
   console.log(data);
 setstate((prevData)=>[...prevData,...data.data]);
setLoader(false);
};





    const handleSearch = async () => {

  
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=4&sort={"price":-1}&sellerTag=best seller', setDealoftheday);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=4&sort={"rating":-1}&sellerTag=trending', setTrendingproducts);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=4&filter={"subCategory":"tv"}', setTelevision);
        // fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products', setcategory, pagecategories);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=4&filter={"subCategory":"mobile"}', setmobile);
      
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
  <Link to={`/search/hp`}> <img src={headerImage}/></Link>   
    </div>
    
    <div className='p-5'>
        <img src={offer1} className='rounded-md overflow-hidden hidden md:block'/>
        <img src={mobileoffer} className='rounded-md overflow-hidden block md:hidden'/>

    </div>

<Box>
<section className="container">
  <div className='container-slide'>

  <div className='sliders'>
  <h2 className="font-medium text-2xl ">Highlights</h2>
  <div className=' flex flex-col gap-1 '>
        <div className=" justify-between gap-1 my-4 hidden md:flex">
          <img src={highlights1} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights2} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights3} className="h-44 md:h-60 rounded-lg" />
        </div>
        <div className="justify-between gap-1 my-4 hidden md:flex">
          <img src={highlights4} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights5} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights6} className="h-44 md:h-60 rounded-lg" />
        </div>

        <div className=' md:hidden'>
          <Slider {...settings}>
          <img src={highlights1} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights2} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights3} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights4} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights5} className="h-44 md:h-60 rounded-lg" />
          <img src={highlights6} className="h-44 md:h-60 rounded-lg" />
          
          </Slider>
        </div>
   </div>
        
      <div>
        <h2 className='font-medium text-2xl '>Deal of the day</h2>
   
    <div >
    <Slider {...settings}>

      {dealoftheday.map((product)=>(
      
 <Link to={`/singleproduct/${product._id}`} >  <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price} ratings={product.ratings} /></Link>
         ))}
      
 </Slider>
    </div>    
       
        
       
      </div>
  
  
  <div >
        <h2 className='font-medium text-2xl '>Trending</h2>
        <div>
          <Slider {...settings}>
          {trendingproducts.map((product)=>(
       <Link to={`/singleproduct/${product._id}`} >   <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price} ratings={product.ratings}/> </Link>  
          ))}    
       </Slider>
        </div>
        
      </div>
  
      <div >
        <h2 className='font-medium text-2xl '>Televisions</h2>
        <div>
          <Slider {...settings}>
          {television.map((product)=>(
        <Link to={`/singleproduct/${product._id}`} >  <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price} ratings={product.ratings}/> </Link>
          ))}    
       </Slider>
        </div>
     
      </div>
  
      <div >
        <h2 className='font-medium text-2xl '>Mobiles</h2>
        <div>
          <Slider {...settings}>
          {mobile.map((product)=>(
    <Link to={`/singleproduct/${product._id}`} > <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price} ratings={product.ratings}/> </Link>
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

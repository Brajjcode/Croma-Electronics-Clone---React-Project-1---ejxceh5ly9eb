import React from 'react'
import logo from "../components/Assets/logo.svg"
import {FaAlignJustify,FaUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

import { IoMenuOutline } from "react-icons/io5"

import { FaShoppingBag } from "react-icons/fa";


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




const Home = () => {
  const [dealoftheday,setDealoftheday]=useState([]);
  const[trendingproducts,setTrendingproducts]=useState([]);
   const[television,setTelevision]=useState([])
   
   const[mobile,setmobile]=useState([]);
   const [searchTerm,setSearchTerm]=useState('')
   const[searchResult,setSearchResult]=useState([]);
   const[categories,setcategory]= useState('');
   const [categoriesresult,setcategoriesresult]=useState([]);

   



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


// useEffect(()=>{

//   const handlesearch=async()=>{
//     if(categories){
//         const response =await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"${categories}"}`,{
//           method:'GET',
//      headers:{
//          'projectID':'f104bi07c490'
//      }
       
//         })
  
//         const categorydata=await response.json();
//         setcategoriesresult(categorydata.data);
//         console.log(setcategoriesresult);
//     }
  
//    else if(searchTerm){
  
//       const response=await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"description":"${searchTerm}"}`,{
//         method:'GET',
//      headers:{
//          'projectID':'f104bi07c490'
//      }
  
//       })
//        const data = await response.json();
//         setSearchResult(data.data);
  
//     }
  
//     else{
//       setSearchResult([]);
//       fetchproducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"price":-1}&sellerTag=best seller',setDealoftheday)
//       fetchproducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"rating":-1}&sellerTag=trending',setTrendingproducts);
//       fetchproducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"tv"}',setTelevision);
//      // fetchproducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products',setcategory,pagecategories);
//      fetchproducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"mobile"}',setmobile)
//     }
//   }
  
//   handlesearch();
// },[])



    const handleSearch = async () => {
      if (categories) {
        
        const responsecat = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"${categories}"}`, {
          method: 'GET',
          headers: {
            'projectID': 'f104bi07c490'
          }
        });
      
        const categoryData = await responsecat.json();
        setcategoriesresult(categoryData.data);
        console.log(setcategoriesresult);
    }
 else if (searchTerm) {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"description":"${searchTerm}"}`, {
          method: 'GET',
          headers: {
            'projectID': 'f104bi07c490'
          }
        });
        const data = await response.json();
        setSearchResult(data.data);
      } else {
        setSearchResult([]);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"price":-1}&sellerTag=best seller', setDealoftheday);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"rating":-1}&sellerTag=trending', setTrendingproducts);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"tv"}', setTelevision);
        // fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products', setcategory, pagecategories);
        fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"mobile"}', setmobile);
      }
    };

  
useEffect(()=>{
  handleSearch()
},[searchTerm])
 




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
       slidesToShow: 2,
       slidesToScroll: 2,
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

const handleCategorySelect = (category) => {
  // Implement your logic based on the selected category
  
  setcategory(category);
  console.log('Selected Category:', category);
 console.log(categories)
};

  return (
    <>
    <header className='bg-black text-white flex justify-between h-20 '>
  
  <div className='w-full m-auto max-w-[1200] px-2'>
  <div className='hidden items-center justify-between w-full md:flex'>
  
  
  <div className='p-3 flex items-center gap-12 w-4/5'>
      <div className='w-32 min-w-[128px]'>
          <img src={logo} className="w-full" />
      </div>

      <div className='flex items-center'>
        <DynamicSelect
        apiEndpoint='https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories'
        projectId='f104bi07c490'
        onSelectCategory={handleCategorySelect}
        />

          <FaAlignJustify className='text-3xl' />
       
          <p className='text-sm'>Menu</p>
      </div>
      <div className='flex items-center bg-white h-9 w-full max-w-md px-2 rounded-md'>
          <input type="text" placeholder="What are you looking for ?" className='w-full bg-transparent outline-none border-none px-3 placeholder:text-sm text-black'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <CiSearch className='text-black text-2xl ' onClick={handleSearch}/>
      </div>
  </div>
  
  
  <div className='flex items-center gap-9'>
      <div className="flex items-center gap-2">
          <MdLocationOn className='text-xl' />
          <p className='whitespace-nowrap text-sm'>Mumbai 400049</p>
          <IoPencil className='text-xs' />
      </div>
      <div className=' text-2xl'>
          <FaUser />
      </div>
      <div className=' text-2xl relative'>
          <FaShoppingBag />
          <p className='text-xs w-3 text-center h-3 flex items-center justify-center rounded-full bg-greenblue absolute top-0 -right-2 text-black'>0</p>
      </div>
  </div>
  </div>
  
  <div className="md:hidden">
                      <div className='flex justify-between'>
                          <div className='flex items-center gap-1'>
                              <div className='flex items-center'>
                                  <IoMenuOutline className='text-3xl' />
                              </div>
                              <div className='w-20 '>
                                  <img src={logo} className="w-full" />
                              </div>
                          </div>
                          <div className='flex items-center gap-3 mr-2'>
                              <div className=' text-xl'>
                                  <FaUser/>
                              </div>
                              <div className=' text-xl relative'>
                                  <FaShoppingBag />
                                  <p className='text-xs w-3 text-center h-3 flex items-center justify-center rounded-full bg-greenblue absolute top-0 -right-2 text-black'>0</p>
                              </div>
                          </div>
                      </div>
                      <div className='flex items-center bg-white h-7 w-full max-w-full px-2 mt-1 rounded-md'>
                          <input type="text" placeholder="What are you looking for ?" className='w-full bg-transparent outline-none border-none px-3 placeholder:text-sm text-black'
                          value={searchTerm}
                          onChange={(e)=>setSearchTerm(e.target.value)}
                          
                          />
                          <CiSearch className='text-black text-2xl '  />
                      </div>
    </div>
    </div>
    </header>
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
    {searchResult.length>0 ? (
      <div>
      <div>
              <h2 className='text-2xl text-white'>Search Results</h2>
              <Slider {...settings}>
                {searchResult.map((product) => (
                  <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price} />
                ))}
              </Slider>
            </div>
        </div>
    ): 
    
      (
        <>

      <div>
        <h2 className='text-2xl text-white'>Deal of the day</h2>
        
        <div >
        <Slider {...settings}>
          {dealoftheday.map((product)=>(
            <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/>
          ))}
     </Slider>
        </div>
        
       
      </div>
  
  
  <div >
        <h2 className='text-2xl text-white'>Trending</h2>
        <div>
          <Slider {...settings}>
          {trendingproducts.map((product)=>(
            <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/>
          ))}    
       </Slider>
        </div>
        
      </div>
  
      <div >
        <h2 className='text-2xl text-white'>Televisions</h2>
        <div>
          <Slider {...settings}>
          {television.map((product)=>(
            <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/>
          ))}    
       </Slider>
        </div>
     
      </div>
  
      <div >
        <h2 className='text-2xl text-white'>Mobiles</h2>
        <div>
          <Slider {...settings}>
          {mobile.map((product)=>(
            <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/>
          ))}    
       </Slider>
        </div>
        </div>
        </>
        )
    
      
          }
   </div>
   </div>
</section>
   </Box>
  
    </div>
    </>
  )
}

export default Home

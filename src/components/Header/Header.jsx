import React from 'react'
import logo from "../Assets/logo.svg"
import {FaAlignJustify,FaUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

import { IoMenuOutline } from "react-icons/io5"

import { FaShoppingBag } from "react-icons/fa";
import { IoPencil } from 'react-icons/io5'
import { MdLocationOn } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import DynamicSelect from '../dropdown/dropdown';
import { CiLogout } from "react-icons/ci";
import Box from '../Box/box';


const Header = () => {

    const[ searchterm, setsearchterm]=useState('');
    const[categories,setcategory]= useState('');
     const [logintext,setLogintext]= useState(<FaUser/>);
     const [shouldLogout, setShouldLogout] = useState(false);
   //  const[isjwt,setjwt]= useState('')

     const logout=()=>{
    
        localStorage.removeItem('userToken')
        setLogintext(<FaUser/>)
        setShouldLogout(false);
        alert("logged out successfully");
     }

     useEffect(()=>{
      const token=localStorage.getItem('userToken');

      setLogintext(token?<CiLogout/>:<FaUser/>)
      setShouldLogout(token ? true : false);
     },[])

    const handleCategorySelect = (category) => {
        // Implement your logic based on the selected category
        
        setcategory(category);
        console.log(category)
        console.log('Selected Category:', categories);
      
      };

  return (
    <div>
      
      <header className='bg-black text-white flex justify-between h-20 '>
  
  <div className='w-full m-auto max-w-[1200] px-2'>
    <Box>
  <div className='hidden items-center justify-between w-full md:flex'>
  
  
  <div className='p-3 flex items-center gap-12 w-4/5'>
    <Link to={`/`}><div className='w-32 min-w-[128px]'>
          <img src={logo} className="w-full" />
      </div></Link>

      <div className='flex items-center'>
    
      <DynamicSelect
        apiEndpoint='https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories'
        projectId='f104bi07c490'
        onSelectCategory={handleCategorySelect}
        
       />
         

      </div>
      <div className='flex items-center bg-white h-9 w-full max-w-md px-2 rounded-md'>
          <input type="text" placeholder="What are you looking for ?" className='w-full bg-transparent outline-none border-none px-3 placeholder:text-sm text-black'
           value={searchterm} onChange={(e)=>setsearchterm(e.target.value)}
          />
        <Link to={`/search/${searchterm}`}><CiSearch className='text-black text-2xl ' /></Link>
      </div>
  </div>
  
  
  <div className='flex items-center gap-9'>
      <div className="flex items-center gap-2">
          <MdLocationOn className='text-xl' />
          <p className='whitespace-nowrap text-sm'>Mumbai 400049</p>
          <IoPencil className='text-xs' />
      </div>
      {/* <div className=' text-2xl' >
       <Link to={`/signin`}  ><FaUser/></Link>
      </div> */}
      <div className='text-2xl'  onClick={() => shouldLogout? logout():undefined}>
      {!shouldLogout ? (
    <Link to="/signin">{logintext}</Link>
  ) :(logintext)
      }
</div>

      <div className=' text-2xl relative'>
     <Link to={`/addtoCart`}  >  <FaShoppingBag />
          {/* <p className='text-xs w-3 text-center h-3 flex items-center justify-center rounded-full bg-greenblue absolute top-0 -right-2 text-black'>0</p>*/}</Link> 
      </div>
  </div>
  
  </div>
  </Box>
  <div className="md:hidden">
                      <div className='flex justify-between'>
                          <div className='flex items-center gap-1'>
                              <div >
                              <DynamicSelect
        apiEndpoint='https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories'
        projectId='f104bi07c490'
        onSelectCategory={handleCategorySelect}
        
       />
                              </div>
                              <div className='w-20 '>
                                  <img src={logo} className="w-full" />
                              </div>
                          </div>
                          <div className='flex items-center gap-3 mr-2'>
                              <div className=' text-xl'>
                              <Link to={`/signin`} ><FaUser/></Link>
                              </div>
                              <div className=' text-xl relative'>
                                  <FaShoppingBag />
                                  {/* <p className='text-xs w-3 text-center h-3 flex items-center justify-center rounded-full bg-greenblue absolute top-0 -right-2 text-black'>0</p> */}
                              </div>
                          </div>
                      </div>
                      <div className='flex items-center bg-white h-7 w-full max-w-full px-2 mb-2 rounded-md'>
                          <input type="text" placeholder="What are you looking for ?" className='w-full bg-transparent outline-none border-none px-3 placeholder:text-sm text-black'
                          value={searchterm} onChange={(e)=>setsearchterm(e.target.value)}
                          
                          />
                    <Link to={`/search/${searchterm}`}> <CiSearch className='text-black text-2xl '  /></Link>  
                      </div>
    </div>
    </div>
    </header>
    </div>
  )
}

export default Header;




  
  
  
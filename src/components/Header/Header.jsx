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
//import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cartcount } from '../UpdateItems/Updateitesm';
import { useCallback } from 'react';
import Toast from 'react-bootstrap/Toast';


const Header = () => {
// Write pin code api code.
//create wishlist.

    const[ searchterm, setsearchterm]=useState('');
    const[categories,setcategory]= useState('');
     const [logintext,setLogintext]= useState(<FaUser/>);
     const [shouldLogout, setShouldLogout] = useState(false);
     const [name,setname]= useState('');
     const [userInfo,setUserInfo]=useState(null)
   //  const[isjwt,setjwt]= useState('')
   const [show, setShow] = useState(false);
  const [pincode,setPincode]= useState('400049')
  const[updateCart,setUpdateCart]= useState(localStorage.getItem(updateCart));
  const [storedUserInfo,setStoreduserInfo]=useState(localStorage.getItem('userdata'))
  const[logoutToast,setLogoutToast]= useState(false)
  //const [initialLoad, setInitialLoad] = useState(false);
 
  //const parsedUserInfo = JSON.parse(storedUserInfo);
  //const storedUserInfo = localStorage.getItem('userdata');
  const parsedUserInfo = JSON.parse(storedUserInfo);
 
  setTimeout(()=>{
    setLogoutToast(false)
  },3000)

   const handleClose = async() =>{
    try{
          const result= await fetch(`http://postalpincode.in/api/pincode/${pincode}`,{
            mode: 'no-cors'
          })
          console.log("pin",result);
          const r=await result.json();
          console.log(r);
          if (result.ok){
            console.log(result);
          }
          else{
            alert("Cannot deliver in your area")
          }
        }
        catch(error){
          console.log(error);
        }    
     setShow(false);
   }
   const handleShow = () => setShow(true);
  



     const logout=()=>{
    
        localStorage.removeItem('userToken')
        setLogintext(<FaUser/>)
        setShouldLogout(false);
        setname('');
       // alert("logged out successfully");
       setLogoutToast(true)
       
       // window.location.reload();
     }

     useEffect(()=>{
      const token=localStorage.getItem('userToken');
  
   const storedUserInfo = localStorage.getItem('userdata')
       

    if (token) {
  
      setShouldLogout(true);

    } else {
    
      setShouldLogout(false);
    }
  //  setLogintext(shouldLogout?<CiLogout/>:<FaUser/>)

    

      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        console.log("parsed",parsedUserInfo)
        setname(parsedUserInfo.name)
      }
          
  
     

     },[shouldLogout,name])

     useEffect(() => {
      setLogintext(shouldLogout ? <CiLogout /> : <FaUser />);
    }, [shouldLogout]); // Only re-run when shouldLogout changes
  
  


     const handleCategorySelect = (category) => {
      // Implement your logic based on the selected category
      
     setcategory(category);
      console.log(category)
      console.log('Selected Category:', categories);
    
    };
    // const handleLogin = () => {
    //   const token = localStorage.getItem('userToken');
    //   const storedUserInfo = localStorage.getItem('userdata');
      
    //   if (token) {
    //     setLogintext(<CiLogout />);
    //     setShouldLogout(true);
    //   }
  
    //   if (storedUserInfo) {
    //     const parsedUserInfo = JSON.parse(storedUserInfo);
    //     setUserInfo(parsedUserInfo);
    //     setname(parsedUserInfo.data.user.name);
    //   }
    // };

   // console.log("stored",storedUserInfo)
   // console.log(parsedUserInfo.data.user.name)
  // console.log("userinfo",storedUserInfo.)
 
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
        onSelectCategory={()=>handleCategorySelect}      
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
      {
    logoutToast &&(
      <>
      <Toast bg='secondary' style={{ zIndex: 1000 }} >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Logout</strong>
        
      </Toast.Header>
      <Toast.Body>Loggedout Sucessfully.</Toast.Body>
    </Toast>
      </>
    )
  }
          <MdLocationOn className='text-xl' />
          
          <Button variant="primary" onClick={handleShow}>
          <p className='whitespace-nowrap text-sm'>{pincode}</p>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter city & pin code.</Modal.Title>
        </Modal.Header>
        <Modal.Body><input type='text' placeholder='search for your area using  pincode e.g. Mumbai,400049' className=' w-full h-12 px-4 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500 ' onChange={(e)=>setPincode(e.target.value)} value={pincode}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className=' bg-red-600' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className=' bg-blue-600' onClick={handleClose}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
          <IoPencil className='text-xs' />
      </div>
       {shouldLogout?(<div>
        Hello,{name}
      </div>):""}
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
            {/* <p className='text-xs w-3 text-center h-3 flex items-center justify-center rounded-full bg-greenblue absolute top-0 -right-2 text-black'>{updateCart}</p>*/}</Link>  
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
                              onSelectCategory={()=>handleCategorySelect}
        
                                />
                              </div>
                              <div className='w-20 '>
                                  <img src={logo} className="w-full" />
                              </div>
                          </div>
                          <div className='flex items-center gap-3 mr-2'>

                          {shouldLogout?(<div>
                           Hello,{name}
                          </div>):""}
      {/* <div className=' text-2xl' >
       <Link to={`/signin`}  ><FaUser/></Link>
      </div> */}
                    <div className='text-2xl'  onClick={() => shouldLogout? logout():undefined}>
                    {!shouldLogout ? (
                            <Link to="/signin">{logintext}</Link>
                    ) :(logintext)
                              }
                                     </div>

                              <div className=' text-xl relative'>
                              <Link to={`/addtoCart`}  > <FaShoppingBag /> </Link>
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




  
  
  
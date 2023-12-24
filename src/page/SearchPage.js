import React from 'react'

import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import ImgMediaCard from '../components/imageurls/imagecard';
import SelectSmall from '../components/dropdown/SearchDropdown';
import Tags from '../components/dropdown/Tags';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const SearchPage = () => {

    const {searchterm}= useParams();
     const [option,setOption]=useState('');
     const [tag,setTag]= useState('');
    const [result,setresult]=useState([]);
  //  const [currentPage, setCurrentPage] = useState(1);
    const [Page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(true);
   
   useEffect(()=>{
     const getSearchResult= async()=>{
        //const filterQuery = `{"description":"${searchterm}"}`;
      const sortQuery = getSortQuery(option);
      const filterString = getFilterString(tag);
      try{
        const response= await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10 &page=${Page}&search={"description":"${searchterm}"}&${sortQuery}&${filterString}`,{
            method:'GET',
           headers:{
       'projectID':'f104bi07c490'
              }
        })
        
// setresult(data.data);
if(response.ok){
  const data=await response.json();
   console.log(data);
 setresult((prevData)=>[...prevData,...data.data]);
 setIsFetching(false);
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
    
     getSearchResult();
   },[searchterm,option,tag,Page])
  

  function viewMore(){
    setPage(Page+1);
  }
   
   const getFilterString=(tags)=>{
    
    switch(tags){
        case 'Trending':
            return 'filter={"sellerTag":"trending"}';
          case 'Best Seller':
            return 'filter={"sellerTag":"best seller"}';
          case 'New Arrival':
            return 'filter={"sellerTag":"new arrival"}';
          default:
            return '';
    }
          
   }
   const getSortQuery = (option) => {
    switch (option) {
      case 'TopRated':
        return 'sort={"rating":-1}';
      case 'lowest':
        return 'sort={"price":1}';
      case 'highest':
        return 'sort={"price":-1}';
      default:
        return '';
    }
  };
   const handleSelectOption=(options)=>{
        
        setOption(options);
        console.log(options);

   }

   const handleTagSelect=(tags)=>{
    setTag(tags);
    console.log(tags);

   }
  return (
   <>
   <SelectSmall onSelectedoption={handleSelectOption}/>
   <Tags onTagselect={handleTagSelect}/>
        <div>
        <h2 className='text-2xl text-white'>{searchterm} result</h2>
        
        <div className='flex flex-wrap gap-2 justify-center items-center'>
       
          {result.map((product)=>(
        <Link to={`/singleproduct/${product._id}`} > <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/> </Link>
          ))}
     
        </div>
        <div className=' flex items-center justify-center'>
        <Button variant="outlined"onClick={()=>viewMore()}  disabled={isFetching}>View More</Button>
        </div>
       
      </div>
   </>
  )
}

export default SearchPage

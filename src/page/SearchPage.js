import React from 'react'

import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import ImgMediaCard from '../components/imageurls/imagecard';
import SelectSmall from '../components/dropdown/SearchDropdown';
import Tags from '../components/dropdown/Tags';
const SearchPage = () => {

    const {searchterm}= useParams();
     const [option,setOption]=useState('');
     const [tag,setTag]= useState('');
    const [result,setresult]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
   
   useEffect(()=>{
     const getSearchResult= async()=>{
        //const filterQuery = `{"description":"${searchterm}"}`;
      const sortQuery = getSortQuery(option);
      const filterString = getFilterString(tag);
        const response= await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"description":"${searchterm}"}&${sortQuery}&${filterString}`,{
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
   },[searchterm,option,tag])
   
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
            <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price}/>
          ))}
     
        </div>
        
       
      </div>
   </>
  )
}

export default SearchPage

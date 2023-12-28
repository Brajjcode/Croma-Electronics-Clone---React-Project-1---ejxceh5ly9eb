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
   
//    useEffect(()=>{
//      const getSearchResult= async()=>{
//         //const filterQuery = `{"description":"${searchterm}"}`;
//       const sortQuery = getSortQuery(option);
//       const filterString = getFilterString(tag);
//       try{
//         const response= await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10 &page=${Page}&search={"description":"${searchterm}"}&${sortQuery}&${filterString}`,{
//             method:'GET',
//            headers:{
//        'projectID':'f104bi07c490'
//               }
//         })
        
// // setresult(data.data);
// if(response.ok){
//   const data=await response.json();
//    console.log(data);

//    setresult((PrevData)=>{

//     if(Page===1){
//       return[...data.data]
//     }
//     else{
//       return[...PrevData,...data.data];
//     }

//    })
   
//    setIsFetching(false)
//   }
// //    if(Page===1){
// //     setresult(data.data);
// //    }
// //    else{
// //     setresult((prevData)=>[...prevData,...data.data])
// //    }
// //  setresult(data.data);
// //  setIsFetching(false);
// // }
// else{
//   setIsFetching(false);
//           console.error('Failed to fetch data');
// }

//      }
//      catch(error){
//       setIsFetching(false);
//         console.error('Error:', error);

//      }

//      if(option!=='' || tag!==''){
//       setPage(1);
//      }
//     }
    
  
    
//      getSearchResult();
//    },[searchterm,option,tag,Page])

useEffect(() => {
  const getSearchResult = async () => {
    const sortQuery = getSortQuery(option);
    const filterString = getFilterString(tag);

    try {
      setIsFetching(true);

      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&page=${Page}&search={"description":"${searchterm}"}&${sortQuery}&${filterString}`, {
        method: 'GET',
        headers: {
          'projectID': 'f104bi07c490'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setresult((prevData) => {
          if (Page === 1) {
            // Reset results for the first page
            return [...data.data];
          } else {
            // Concatenate for pagination
            return [...prevData, ...data.data];
          }
        });
        //setIsFetching(false)
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    } 
    finally{
      setIsFetching(false)
    }
  };

  // Reset page to 1 only when either option or tag changes AND View More is not clicked
  // if ((option !== '' || tag !== '') && !isFetching) {
  //   setPage(1);
  // }

  getSearchResult();
}, [searchterm, option, tag, Page]);

  
   function viewMore(){
    setPage((prevPage) => prevPage + 1);
       //setresult((prevData)=>[...prevData,...data.data])

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
        return 'sort={"ratings":-1}';
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
        setPage(1);
        console.log(options);

   }

   const handleTagSelect=(tags)=>{
    setTag(tags);
    setPage(1)
    console.log(tags);

   }
  return (
   <>
   <SelectSmall onSelectedoption={handleSelectOption}/>
   <Tags onTagselect={handleTagSelect}/>
        <div>
        <h2 className='font-medium text-2xl pl-5'>{searchterm} results</h2>
        
        <div className='flex flex-wrap gap-2 justify-center items-center'>
       
          {result.map((product)=>(
        <Link to={`/singleproduct/${product._id}`} > <ImgMediaCard key={product.id} url={product.displayImage} name={product.name} price={product.price} ratings={product.ratings}/> </Link>
          ))}
     
        </div>
        <div className=' flex items-center justify-center'>
        <Button variant="outlined"onClick={() => viewMore()}  disabled={isFetching}>View More</Button>
        </div>
       
      </div>
   </>
  )
}

export default SearchPage

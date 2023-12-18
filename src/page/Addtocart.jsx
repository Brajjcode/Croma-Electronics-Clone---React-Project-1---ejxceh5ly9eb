import React from 'react'
import headphone from "../components/Assets/271807_xhhqk6.webp"
import { useState,useEffect } from 'react'
const Addtocart = () => {
    const [cartproducts,setcartproducts]=useState([]);
    const [total,setotal]=useState(0)
    const [qty,setqty]= useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(()=>{
        const storedcart=JSON.parse(localStorage.getItem('favoriteProducts'))||[];
        setcartproducts(storedcart);
            
        
        console.log(storedcart);
    },[])


  function changehandlerdec(){
    if(qty==0){
        return
    }
    else{
        setqty(qty-1);
        handleProductselection()
    }
  }

  function changehandlerinc(){
    setqty(qty+1)
    handleProductselection();
  }

function handleProductselection(product){
 setSelectedProduct(product)
 console.log("selectedproduct=>",product)
}

const updateTotal=()=>{
  if(selectedProduct){
    setotal(qty*selectedProduct[0]*price)
  }
}


 

  return (
    <>
    <div className=' p-20 my-px'>
     <table class="table" >
  <thead className=''>

    <tr className=''>
      <th scope="col" className='bg-dark text-white'>Image</th>
      <th scope="col" className='bg-dark text-white'>Name</th>
      <th scope="col" className='bg-dark text-white'>Price</th>
      <th scope="col" className='bg-dark text-white'>QTY</th>
      <th scope="col" className='bg-dark text-white'>Total</th>
    </tr>
  </thead>
  <tbody>
    { cartproducts.map((product)=>(

    
    <tr key={product.id}>
      <th scope="row"><img src={product.displayImage} alt='img' width={50+"px"} height={50+"px"}/></th>
      <td >{product.name}</td>
      <td>{product.price}</td>
      <td>        <div className=' flex flex-row gap-1'>
            <button onClick={()=>{handleProductselection(product),changehandlerinc()  }}>+</button>
            <div>{qty}</div>
            <button onClick={()=>{handleProductselection(product);changehandlerdec()}}>-</button>
        </div></td>

      <td>{total}</td>

    </tr>
))}
  </tbody>
</table>
</div>
    </>
  )
}

export default Addtocart

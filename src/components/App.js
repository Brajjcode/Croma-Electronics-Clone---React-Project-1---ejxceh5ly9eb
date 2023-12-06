import { Outlet } from "react-router-dom";
import "../styles/App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../page/home";
import SearchPage from "../page/SearchPage";
import Dropdownpage from "../page/Dropdownpage"
import Header from "./Header/Header";
import SingleProductpage from "../page/SingleProductpage";
function App() {
  return (
    <>
    
     <BrowserRouter>
      <Header/>
      <Routes>
    <Route path="/" element={<Home/>}/> 
    <Route path="/search/:searchterm" element={<SearchPage/>}/>
    <Route path ="/dropdown/:seletedterm" element={<Dropdownpage/>}/>
    <Route path ="/singleproduct/:id" element={<SingleProductpage/>}/>
    
     </Routes>
     </BrowserRouter> 
     </>
     
  )
}

export default App;

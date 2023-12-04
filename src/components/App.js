import { Outlet } from "react-router-dom";
import "../styles/App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../page/home";
import SearchPage from "../page/SearchPage";
import Dropdownpage from "../page/Dropdownpage"
import Header from "./Header/Header";
function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
    <Route path="/" element={<Home/>}/> 
    <Route path="/search/:searchterm" element={<SearchPage/>}/>
    <Route path ="/dropdown/:seletedterm" element={<Dropdownpage/>}/>
     </Routes>
     </BrowserRouter>
     </>
     
  )
}

export default App;

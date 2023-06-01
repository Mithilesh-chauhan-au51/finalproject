// Import the App.css file for styling
import './App.css';
// Import the important component
import HomePage from "./components/home"
import Errorpage from "./components/error"
import Login from "./components/login"
import Signup from "./components/register" 
import Navigationbar from "./components/nav"
import Addproducts from "./components/addsell"
import ProductDetails  from "./components/productDetail"
import Myadds from "./components/myadds"
import Myfavourite from "./components/myfavourite"
import Forgetpassword from "./components/forgetpassword/forgetpassword"
import Chat from "./components/chat/chatpages/chat"



// Import the Routes and Route components from react-router-dom
import {Routes,Route} from "react-router-dom"

function App() {

  return (
   <>
   {/*creating routes  */}
      <Navigationbar />

     <Routes>
     <Route path={"/"} element={<HomePage />}  />
     <Route path={"/login"} element={<Login />} />
       <Route path={"/forgetpass"} element={<Forgetpassword />} />
     <Route path={"/signup"} element={<Signup />} />
     <Route path={"/addproducts"} element={<Addproducts />} />
      <Route path={"/proddetail"} element={<ProductDetails />} /> 
        <Route path={"/myadds"} element={<Myadds />} /> 
       <Route path={"/myfavourite"} element={<Myfavourite />} /> 
              <Route path={"/chat"} element={<Chat />} />
        
       
     <Route  path={"*"} element={<Errorpage />}/>
     
      
     </Routes>     
     
   </>
  );
}

export default App;

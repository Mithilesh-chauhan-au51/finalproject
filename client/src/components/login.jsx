
import { Link,useNavigate } from 'react-router-dom';
import { useRef,useState } from "react"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";




const Login=()=>{

  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => {
    setShowPassword(!showPassword);
  }
 const [error, setError] = useState(null);
 //const [tokendata,setupdatetoken]=useState({})
  
  let email = useRef(null);
  let password = useRef(null);
  
  const navigate = useNavigate();

  
  const handleSubmit = async  (e) => {
    e.preventDefault();
     try {
        const response = await axios.post('https://capstoneproject-server.harry-potter1.repl.co/login' ,{
      email: email.current.value,
      password: password.current.value,
      })
      
       // console.log(response.data);
      //store.dispatch(Setdata(response.data));
       //alert("sucessfully loggedin")
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.others));
     
       navigate('/home')
   } catch (error) {
      console.error(error);
      
         setError("enter correct mail and password");    
    }
  };

 
  
  
  return (
    <>
       <div className="vh-100 d-flex align-items-center justify-content-center p-5" style={{backgroundColor: "#87CEEB"}}>

      <div className="card p-4 w-100 w-md-50">
         {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
        
          <div className="mb-3">
            <input type="email" placeholder="Email" className="form-control" ref={email} />
          </div>



          
         <div className="form-group">
      
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          id="password"
          ref={password}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleToggle}
          >
            <FontAwesomeIcon
      icon={showPassword ? faEyeSlash : faEye}
      className="icon"
    />
          </button>
        </div>
      </div>
    </div>




          
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary">login</button>
          </div>
        </form>
        <div className="mt-3">
        <p>Don't have an account?
    <Link to="/signup">Register</Link>
  </p>
        </div>
        
        <div >
  <p>If you forget password click here?
    <Link to="/forgetpass">Forget-Password</Link>
  </p>
</div>
        
      </div>
    </div>
     


    </>
  )
}
export default Login
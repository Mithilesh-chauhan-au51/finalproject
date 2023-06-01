import { Link,useNavigate } from 'react-router-dom';
import { useRef,useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
//import Eyeinput from "./eyeip"

const Signup = () => {
   const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => {
    setShowPassword(!showPassword);
  }
    const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  let firstname = useRef(null);
  let lastname = useRef(null);
  let email = useRef(null);
  let password = useRef(null);
  let phoneNumber=useRef(null)

  const handleSubmit = async  (e) => {
    e.preventDefault();
     try {
        const response = await axios.post('https://capstoneproject-server.harry-potter1.repl.co/register' ,{
        firstname: firstname.current.value,
      lastname: lastname.current.value,
      email: email.current.value,
      password: password.current.value,
      phoneNumber:phoneNumber.current.value    
      });
        console.log(response.data);
       navigate('/login')
   } catch (error) {
      console.error(error);
      setError("you already registered");
    }
  };

 
  return (
    <>
   <div className="vh-100 d-flex align-items-center justify-content-center p-5" style={{backgroundColor: "#87CEEB"}}>

      <div className="card p-4 w-100 w-md-50"  >
         {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" placeholder="First Name" className="form-control" ref={firstname} />
          </div>
          <div className="mb-3">
            <input type="text" placeholder="Last Name" className="form-control" ref={lastname} />
          </div>
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






           <div className="mb-3 mt-3">
            <input type="number" placeholder="phone number" className="form-control" ref={phoneNumber} />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <p>Already have an account? <Link to="/login">LogIn</Link></p>
        </div>
      </div>
    </div>

      
    </>
  );
};

export default Signup;

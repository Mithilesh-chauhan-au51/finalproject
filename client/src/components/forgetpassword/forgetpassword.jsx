import {Navigate} from "react-router-dom"
import { useRef,useState,useEffect } from "react"
import axios from 'axios';
import ChangePassword from "./changepassword"


const Forgetpassword=(props)=>{
  const[otp,setotp]=useState("")
  const[mail,setmail]=useState("")
  const [isEmailEntered, setIsEmailEntered] = useState(false)
   const[verifyotp,setverifyotp]=useState(false)
  const [successMessage, setSuccessMessage] = useState('');
 let email = useRef(null);
  let otpInput =useRef(null)
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

useEffect(() => {
    let timeout;
    if (successMessage) {
      timeout = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    return () => clearTimeout(timeout); 

  }, [successMessage]);
  

   const handleSubmit = async  (e) => {
    e.preventDefault();
     try {
        const response = await axios.post('https://capstoneproject-server--harry-potter1.repl.co/sendotp' ,{
       
      email: email.current.value,
      
      });
      if (response.data === "enter correct email") {
    setSuccessMessage("Enter correct email");
  } else {
    setotp(response.data.otp);
      setmail(response.data.email)  
      //  console.log("data",response.data)
    setIsEmailEntered(true);
  }
   } catch (error) {
      console.error(error);     
    }
  };
  

 const handleVerifyOTP = (e) => {
    e.preventDefault();
    const enteredOTP = otpInput.current.value;
   if(enteredOTP==otp){
        setverifyotp(true)
   }
   else  { setSuccessMessage("Enter Correct OTP")
   //console.log("Eotp",enteredOTP)
         }
  
  };



 // console.log( "message :",isEmailEntered)
  //console.log("gotp,",otp)
 // console.log( "votp",verifyotp)
  return(
    <>
       {!isEmailEntered  && (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h4>Send OTP</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label >Email</label>
                <input type="email" className="form-control" id="email"  
 ref={email}  required />
              </div>
              <button type="submit" className="btn btn-primary" >Send OTP</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>


) }


 {isEmailEntered && !verifyotp &&(
<div className="container mt-5">
		<h1 className="mb-3">Verify OTP</h1>
		<form onSubmit={handleVerifyOTP}>
			<div className="form-group">
				<label >OTP:</label>
				<input type="text" className="form-control" id="otp" ref={otpInput} placeholder="Enter the OTP you received" required />
			</div>
			<button type="submit" className="btn btn-primary">Verify OTP</button>
		</form>
	</div>

)}
{successMessage && <div className="alert alert-danger">{successMessage}</div>}

           {verifyotp &&(
      <ChangePassword  mail={mail}/>
)}
      

    </>
  )
}
export default Forgetpassword
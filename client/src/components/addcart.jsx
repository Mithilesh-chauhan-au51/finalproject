import {useEffect,useState} from "react"
import axios from 'axios';



const Addcart=(props)=>{
const [successMessage, setSuccessMessage] = useState('');


useEffect(() => {
    let timeout;

    if (successMessage) {
      timeout = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }

    return () => clearTimeout(timeout); 

  }, [successMessage]);

  
  
const addtocart = async () => {
  
    try {
       let product_id = props.product_id;
      const token = localStorage.getItem('token');
       const user = JSON.parse(localStorage.getItem("user"));
      const current_user_id=user._id;
console.log(product_id,current_user_id)
       const formData = new FormData();
      formData.append('current_user_id', current_user_id);
      formData.append('product_id', product_id);

      const response = await axios.post(`https://capstoneproject-server--harry-potter1.repl.co/addcart`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage(response.data);
      
      console.log(response.data)
    } catch (error) {
      console.error('Error deleting product', error);
    }
  }

 
  
  return(
    <>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    <button className="btn btn-success" onClick={()=>addtocart()}>Add Favourite</button>
    </>
  )
}
export default Addcart
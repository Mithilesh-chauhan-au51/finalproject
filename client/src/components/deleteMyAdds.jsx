import {useEffect,useState} from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Deletebutton=(props)=>{
const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

const deleteproduct = async () => {
  let id = props.product_id;
  console.log(id)
  const confirmDelete = window.confirm('Are you sure you want to delete this product?');

  if (confirmDelete) {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`https://capstoneproject-server--harry-potter1.repl.co/deleteadd/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage(response.data);
       navigate('/')
      //console.log(response.data)
    } catch (error) {
      console.error('Error deleting product', error);
    }
  }
};
 
  
  return(
    <>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    <button className="btn btn-danger" onClick={()=>deleteproduct()}>Delete ADD</button>
    </>
  )
}
export default Deletebutton
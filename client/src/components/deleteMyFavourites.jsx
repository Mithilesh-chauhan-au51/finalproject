import {useEffect,useState} from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const DeleteMyFavourite=(props)=>{
const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

const deleteproduct = async () => {
  let id = props.product_id;
  console.log(id)
  const confirmDelete = window.confirm('Are you sure you want to remove as favourite?');

  if (confirmDelete) {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`https://capstoneproject-server--harry-potter1.repl.co/deleteMyfavourite/${id}`, {
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
      {/* {successMessage && <div className="alert alert-success">{successMessage}</div>} */}
    <button className="btn btn-danger" onClick={()=>deleteproduct()}>Remove as favourite</button>
    </>
    )
}
export default DeleteMyFavourite
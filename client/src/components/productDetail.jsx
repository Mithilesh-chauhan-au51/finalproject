import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import {useParams} from "react-router-dom"
import {useEffect,useState} from "react"
import { useNavigate} from 'react-router-dom';
import Addcart from "./addcart"

import axios from 'axios';

const ProductDetails=()=>{
    const [product, setProduct] = useState(null);
  const [userid, setUserid] = useState("");
    const [message,setmessage]=useState(null)
    console.log(userid)


  useEffect(() => {
    let timeout;
    if (message) {
      timeout = setTimeout(() => {
        setmessage('');
      }, 3000);
    }
    return () => clearTimeout(timeout); 

  }, [message]);
 
  useEffect(() => { 
    const storedProduct = localStorage.getItem('selectedProduct');
   const user = JSON.parse(localStorage.getItem("user"));
   if(user)  setUserid(user._id)
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  const navigate = useNavigate();
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


const HandleClick= async () => {
  
    try {
       
     
      const token = localStorage.getItem('token');
     
      const receiverId =product.user_id ;
// console.log("r",receiverId)
//       console.log("u",userid)
       const formData = new FormData();
      formData.append('senderId', userid);
      formData.append('receiverId', receiverId);

      const response = await axios.post(`https://capstoneproject-server--harry-potter1.repl.co/chat`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });  
      setmessage(response.data.message)
      navigate("/chat")
      
    } catch (error) {
      console.error('Error deleting product', error);
    }
  }


  
if (!product) {
    return <div>Loading...</div>;
  }


  return (
  <>
   

<div className="p-3">
 <Carousel fade variant="dark">
  {product && product.url.map((x)=> (
    <Carousel.Item>
    <img className="d-block w-100" src={x} alt="First slide" style={{ height: '90vh', objectFit: 'contain' }} />

      <Carousel.Caption>
        <h3>slide view</h3>
      </Carousel.Caption>
    </Carousel.Item>
  
))}
 
</Carousel> 

 <div className="row mt-3">
  <div className="col-md-8">
    <Card >
      <Card.Header>
        <h5>Name</h5> {product.brand}
      </Card.Header>
      <Card.Header>
        <h5>Price</h5>{product.price}
      </Card.Header>
      <Card.Body>
        <Card.Title>Product detail</Card.Title>
        <Card.Text>
          {product.productdetail}
        </Card.Text>
         <Card.Title>Description </Card.Title>
        <Card.Text>
            {product.description}     
        </Card.Text>
        { userid && userid!=product.user_id &&(
       <Addcart  product_id={product._id}/>
       ) }
      </Card.Body>
    </Card>
  </div>
  <div className="col-md-4">
    <Card style={{ width: '18rem' }}>
      <Card.Header><h3>Address</h3></Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><h5>product owner name:</h5>
  {product.firstname && product.lastname ? `${product.firstname} ${product.lastname}` : 'N/A'}
</ListGroup.Item>
        <ListGroup.Item> {product.addressone},{product.addresstwo}</ListGroup.Item>
        <ListGroup.Item>{product.city},{product.state}</ListGroup.Item>
        <ListGroup.Item><h5>Contact Number</h5>{product.phone}</ListGroup.Item>
        {message && <div className="alert alert-success">{message}</div>}
         { userid && userid!=product.user_id &&(
        <button className="btn btn-success" onClick={HandleClick}>Click here to Chat</button>
) }
      </ListGroup>
    </Card>
  </div>
</div>
  

</div>
  </>
  
  )
}
export default ProductDetails
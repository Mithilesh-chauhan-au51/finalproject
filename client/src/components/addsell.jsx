import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


import ImageUploadButton from '../common/selectImageButon';
import axios from 'axios';
import '../cam.css';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import {useRef} from "react"


const Addproducts=(props)=>{
  const [uploadedImageSrcarray, setUploadedImageSrc] = useState([]);
   


  
  const fileInput = useRef(null);
  const [message,setmessage]=useState(null)

  let category = useRef(null);
  let brand=useRef(null)
   let price=useRef(null)
   let addressone=useRef(null)
   let addresstwo=useRef(null)
    let city=useRef(null) 
   let state=useRef(null)
  let phone=useRef(null)
   let productdetail=useRef(null)
  let description=useRef(null)
  
const handleImageUpload = (imageSrc) => {
    setUploadedImageSrc([...uploadedImageSrcarray, imageSrc]);
  };

  //  console.log("array :",uploadedImageSrcarray)
 const navigate = useNavigate();
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);



   const handleSubmit = async  (e) => {
    e.preventDefault();
    // console.log("array2 :",uploadedImageSrcarray)
     try {
       const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem("user"));
const user_id = user._id;

      // console.log(user_id)
       const formData = new FormData();
formData.append('category', category.current.value);
formData.append('brand', brand.current.value);
formData.append('price', price.current.value);
formData.append('addressone', addressone.current.value);
formData.append('addresstwo', addresstwo.current.value);
formData.append('city', city.current.value);
formData.append('state', state.current.value);
formData.append('phone', phone.current.value);
formData.append('productdetail', productdetail.current.value);
formData.append('description', description.current.value);
 formData.append('user_id', user_id);
 formData.append('firstname', user.firstname);      
  formData.append('lastname', user.lastname);     
const imageArray = uploadedImageSrcarray.map((imageSrc, index) => {
  return { [`image${index + 1}`]: imageSrc };
});

formData.append('images', JSON.stringify(imageArray));
       
        const response = await axios.post('https://capstoneproject-server.harry-potter1.repl.co/addsell' ,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
        })
      setmessage(response.data)
        console.log(response.data);
     
     
       navigate('/home')
   } catch (error) {
      console.error(error.response);
      
    }
  };

  
  
  return (
    <>
      <div className='container text-center'>
        <h1>Post Your Add</h1></div>

    
      
      <div className="container py-4">
  <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
         <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Categories</Form.Label>
          <Form.Select defaultValue="Choose..."  ref={category} required>
            <option>Cars</option>
            <option>Bikes</option>
            <option>Books</option>
            <option>Furniture</option>
            <option>Electronics</option>
            <option>Phones</option>
             <option>Others</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="productName">
  <Form.Label>Name of the product</Form.Label>
  <Form.Control type="text" placeholder="Enter product name"ref={brand} required />
</Form.Group>
      </Row>

    <Form.Label><h3>Set A Price</h3></Form.Label>
    <InputGroup className="mb-3">     
        <InputGroup.Text>INR</InputGroup.Text>
        <Form.Control aria-label="Amount (to the nearest dollar)" ref={price} required/>
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St"  ref={addressone} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" ref={addresstwo} required/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>State</Form.Label>
          <Form.Control ref={city} required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>City</Form.Label>
          <Form.Select defaultValue="Choose..." ref={state} required>
            <option>Hyderabad</option>
            <option>Mumbai</option>
            <option>Bangaluru</option>
            <option>Kolkata</option>
            <option>chennai</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhone">
  <Form.Label>Phone Number</Form.Label>
  <Form.Control type="number" placeholder="Enter phone number" ref={phone} required/>
</Form.Group>

       
      </Row>
<Form.Label>Product Details</Form.Label>
 <FloatingLabel
        controlId="floatingTextarea"
        label="Other details of your product"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Other details of your product" ref={productdetail} required />
      </FloatingLabel>
    
    <Form.Label>Description</Form.Label>
 <FloatingLabel controlId="floatingTextarea2" label="Include condition, features and reason for selling">
        <Form.Control
          as="textarea"
          placeholder="Include condition, features and reason for selling"
          style={{ height: '100px' }} ref={description} required
        />
      </FloatingLabel>

  

    <div className="container mt-3 mb-3">
        <div className="row mb-3">
          <div className="col-md-6 ">
            <ImageUploadButton onImageUpload={handleImageUpload} />
          </div>
          <div className="col-md-6">
            <ImageUploadButton onImageUpload={handleImageUpload} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <ImageUploadButton onImageUpload={handleImageUpload} />
          </div>
          <div className="col-md-6">
            <ImageUploadButton onImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>
    
 
    
    
    <div className="container mt-3 text-center">
      <Button variant="primary" type="submit" >
        Post now  
      </Button>
  </div>
    </Form>
</div>
    
    </>
  )
}
export default Addproducts
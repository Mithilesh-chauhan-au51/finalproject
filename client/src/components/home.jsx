import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import React from 'react';
import {useEffect,useState} from "react"
import { useNavigate } from "react-router-dom";
//import store from "../store"
import axios from 'axios';
import Footer from "./footer"




const HomePage=(props)=>{
  const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
  const [locationCategory , setLocationCategory]=useState("")
  
const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationCategory(e.target.value);
  };
  //console.log(locationCategory)
  
  useEffect(() => {
  async function fetchData() {
    try {
     // const token = localStorage.getItem('token');
      const response = await axios.get('https://capstoneproject-server--harry-potter1.repl.co/allprod');
     
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}, []);

  const handleSeeMoreClick = (product) => {
    localStorage.setItem('selectedProduct', 
   JSON.stringify(product));
     navigate('/proddetail');
  };

  
 
  if (products.length === 0) {
    return <div>Loading...</div>;
  }

const filteredProducts = products && products.filter((product) => {
  return product.category === selectedCategory || selectedCategory === "" 
}).filter((product) => {
  return product.state === locationCategory || locationCategory === ""
}).filter((product) => {
  return product.brand.toLowerCase().includes(searchQuery.toLowerCase())
})

//console.log(filteredProducts)
  
  return (
    <>
<div className="p-3" style={{backgroundColor:"whitesmoke"}}>
<div className="row">
  <div className="col-md-4">
      <Form.Select aria-label="Default select example" onChange={handleCategoryChange}>
  <option value="">All Categories</option>
  <option value="Cars">Cars</option>
  <option value="Bikes">Bikes</option>
  <option value="Books">Books</option>
  <option value="Furniture">Furniture</option>
  <option value="Electronics">Electronics</option>
  <option value="Phones">Phones</option>
  <option value="Others">Others</option>
</Form.Select>

</div>
   <div className="col-md-4">
  <Form.Select aria-label="Default select example" onChange={handleLocationChange}>
  <option value="">All location</option>
  <option value="Hyderabad">Hyderabad</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Kolkata">Kolkata</option>
  <option value="Bangaluru">Bangaluru</option>
    <option value="chennai">chennai</option>
</Form.Select>

</div>
      <div className="col-md-4">
       <Form className="d-flex ">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" onClick={() => setSearchQuery("")}>clear</Button>
          </Form>
      </div>

 </div>












      
    <div className="mt-3 py-3 " >
  {filteredProducts.length === 0 ? (
    <div className="mt-3 py-3 text-center "><h1>No results found.....</h1></div>
  ) : (
    <Row className="row-eq-height  ">
      {filteredProducts.map((x) => (
        <Col sm={3} key={x._id} className="mb-3">
          <Card className="h-100 d-flex flex-column bg-success text-light  mb-3" style={{ width: '18rem', marginBottom: '20px', objectFit: 'cover' }}>
            <Card.Img variant="top" src={x.url[0]} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Name: {x.brand}</Card.Title>
              <Card.Title>Price: {x.price}</Card.Title>
              <Card.Text>Product Details: {x.productdetail}</Card.Text>
              <div className="mt-auto">
                <button className="btn btn-primary" onClick={() => handleSeeMoreClick(x)}>See more</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )}
</div>
  </div>

<Footer />
    </>
  )
}
export default HomePage

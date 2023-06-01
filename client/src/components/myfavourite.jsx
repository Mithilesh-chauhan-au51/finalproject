 import React from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteMyFavourite from "./deleteMyFavourites"
import { useNavigate } from "react-router-dom";
import Footer from "./footer"


const Myfavourite=(props)=>{
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
  
  
 const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


  

useEffect(() => {
  async function fetchData() {
    try {
      const token = localStorage.getItem('token');
     
        const user = JSON.parse(localStorage.getItem("user"));
const id = user._id;
//console.log(id)
      
   const response = await axios.get(`https://capstoneproject-server--harry-potter1.repl.co/myfavourite/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setProducts(response.data.data);
       setIsLoading(false); 
    } catch (error) {
      console.error(error);
       setIsLoading(false); 
    }
  }
  fetchData();
}, []);

 // console.log(products)

   if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (products.length === 0) {
    return (
      <div className="mt-3 py-3 text-center">
        <h1>You Cart is empty</h1>
      </div>
    );
  }

 

 // console.log(products)
  
  
  return (
   
   <>
     <div className="p-3" style={{backgroundColor:"whitesmoke"}}>
     <h3>My Favourites</h3>




     <div className="mt-3 py-3">
  {products.length === 0 ? (
    <div className="mt-3 py-3 text-center"><h1>You haven't listed anything yet</h1></div>
  ) : (
    <Row className="row-eq-height">
      {products && products.map((x) => (
        <Col sm={3} key={x._id} className="mb-3">
          <Card className="h-100 d-flex flex-column bg-success text-light" style={{ width: '18rem', marginBottom: '20px', objectFit: 'cover' }}>
            <Card.Img variant="top" src={x.url[0]} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Name: {x.brand}</Card.Title>
              <Card.Title>Price: {x.price}</Card.Title>
              <Card.Title>PhoneNumber: {x.phone}</Card.Title>
              <Card.Text>Product Details: {x.productdetail}</Card.Text>
              <div className="mt-auto">
               <DeleteMyFavourite product_id={x._id} />
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
);

  
}
export default Myfavourite
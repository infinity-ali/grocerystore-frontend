import React from 'react'
import Banner from "./Banner"
import { Row, Col, Container, Button } from 'reactstrap'
import tick from "./Assets/tickk.png"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Success = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    
    // localStorage.removeItem("cart-products")
    // localStorage.removeItem("items")
  }, [])


  // window?.location?.reload();

  function handleShopping(){
    setTimeout(redirect, 800);
    function redirect(){
      navigate("/")
    }
  }
  return (
    <>
        {/* <Banner /> */}
        <Container>
          <Row>
            <Col lg={4} className='mx-auto mt-4'>
              <img className='mb-4' src={tick} style={{width:"50%", marginLeft:"26%"}} alt="" />
              <h3 className='text-center' style={{fontSize:"2rem", fontWeight:"700", color:"gray"}}>Order Placed Successfully</h3>
              <p className='text-center' style={{fontSize:"1rem", fontWeight:"400", color:"black", lineHeight:"15px"}}>Order details will be sent to your email address</p>
              <p className='text-center' style={{fontSize:"1rem", fontWeight:"400", color:"black", lineHeight:"15px"}}> Your Email: JohnDoe@gmail</p>
              <p className='text-center' style={{fontSize:"1rem", fontWeight:"400", color:"black", lineHeight:"15px"}}>Order Number: @32424</p>
              <Button className='w-100 border-0' style={{backgroundColor:"#b02e46"}} onClick={handleShopping}>Continue Shopping</Button>
            </Col>
          </Row>

        </Container>
    </>
  )
}

export default Success
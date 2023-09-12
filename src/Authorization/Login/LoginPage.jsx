import React from 'react'
import image from './logo.jpg'
import building1 from './building1.jpg'
import google from './google.webp'
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText, Container} from 'reactstrap'
import { useState } from 'react'
import { useAuth } from '../../Authentication/useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { clientLogin } from '../../store/actions'
import { NotificationManager } from "react-notifications";
import { IoIosArrowBack } from 'react-icons/io';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectorLoginData = useSelector((state)=> state)
  console.log("all response:", selectorLoginData)

  const token = selectorLoginData?.adminReducer?.ClientLogin?.token;
  // console.log("token:", token)

  if(token){
    navigate("/checkout");
  }

  // const {login} = useAuth();
  const [userLoginData, setUserLoginData] = useState({
    email:"",
    password:""
  })

  function handleChange(e){
    const {name, value} = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value
    })
  }

  function handleLogin(e){
    e.preventDefault();
    // console.log("userloginData:", userLoginData)
    dispatch(clientLogin(userLoginData));
    // navigate("/emailverification")
  }

  return (
  <>
   <Container fluid style={{backgroundColor:"#efefef"}}>
          <Row>
            <Col lg={3} xs={1}>
            </Col>

            <Col lg={6} className="bg-light px-5 py-4 mt-4" style={{marginBottom:"3%"}}>

                   <span className='d-flex'>
                   <IoIosArrowBack size="20px" color="gray" style={{cursor:"pointer"}} onClick={()=> window.history.back()} className='mt-2'/>
                   <h3 className='f-flex mx-auto text-center pb-3'>Account Login</h3>
                   </span>
                   
                   <Form onSubmit={(e)=>handleLogin(e)}>
                          <Row className="myInputFields">
                                <Col lg={12} md={12} sm={12}>
                                  <span
                                    className="text-capitalize"
                                    style={{
                                      fontSize: "13px",
                                      fontWeight:"700",
                                      color: "black",
                                      lineHeight: "10px",
                                    }}
                                  >
                                    EMAIL ADDRESS *
                                  </span>{" "}
                                  <br />
                                  <input
                                    className="w-100 bg-light py-1"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={userLoginData.email}
                                    type="email"
                                    required

                                    style={{
                                      borderBottomWidth: "1.5px",
                                      borderBottomColor:"gray",
                                      borderTopWidth: "0px",
                                      borderRightWidth: "0px",
                                      borderLeftWidth: "0px",
                                    }}
                                    onChange={(e)=>handleChange(e)}
                                  />
                                </Col>
                          </Row>  

                          <Row className="mt-3 myInputFields">
                                <Col lg={12} md={12} sm={12}>
                                  <span
                                    className="text-capitalize"
                                    style={{
                                      fontSize: "13px",
                                      fontWeight:"700",
                                      color: "black",
                                      lineHeight: "10px",
                                    }}
                                  >
                                    PASSWORD *
                                  </span>{" "}
                                  <br />
                                  <input
                                    className="w-100 bg-light py-1"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={userLoginData.password}
                                    type="password"
                                    required
                                    
                                    style={{
                                      borderBottomWidth: "1.5px",
                                      borderBottomColor:"gray",
                                      borderTopWidth: "0px",
                                      borderRightWidth: "0px",
                                      borderLeftWidth: "0px",
                                    }}
                                    onChange={(e)=>handleChange(e)}
                                  />
                                </Col>
                          </Row>  
                          <p className='mt-3 d-flex justify-content-end' style={{cursor:"pointer", fontSize:"12px", color:"gray"}}>Forgot Password? </p>
                          <Row>
                            <Col className='d-flex justify-content-start'>
                                    <Button className='py-1 border-0 rounded-0 px-4 fs-6 fw-light' type='submit' style={{backgroundColor:"#b02e46"}}>LOGIN</Button>
                            </Col>
                          </Row>
                          <p className='mt-2' style={{cursor:"pointer", fontSize:"12px", color:"gray"}} onClick={()=>navigate("/signup")}>Don't have an account? Click Here </p>
                    </Form>
              </Col>
        <Col lg={3} xs={0}>
        </Col>
      </Row>          
    </Container>
  </>
  )
}

export default LoginPage
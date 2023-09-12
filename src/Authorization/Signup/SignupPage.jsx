import React from 'react'
import image from './logo.jpg'
import building1 from './building1.jpg'
import google from './google.webp'
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText, Container} from 'reactstrap'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clientSignup } from '../../store/actions'
import { useNavigate } from 'react-router'
import { NotificationManager } from 'react-notifications'
import { IoIosArrowBack } from 'react-icons/io';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectorLoginData = useSelector((state)=> state)
  // console.log("all response:", selectorLoginData)

  if(selectorLoginData?.adminReducer?.ClientSignup?.clientDetails!==null){
    navigate("/emailverification")
  }

  const [registrationData, setRegistrationData] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    // confirmPassword:"",
  })

const handleChange = (e) =>{
  const {name, value} = e.target;
  setRegistrationData({
    ...registrationData,
    [name]:value,
  })
}

const handleRegistration = (e) => {
  e.preventDefault();
  // console.log("Registration:", registrationData)

  if(registrationData.phone<12){
    alert("Phone number must be greater than 11")
  }
  else{
    dispatch(clientSignup(registrationData))
  }

  // else{
  //   NotificationManager.error("Signup Failed")
  // }
  // navigate("/login")
}

  return (
  <>
    <Container fluid style={{backgroundColor:"#efefef"}}>
          <Row>
            <Col lg={3} xs={1}>
            </Col>

            <Col lg={6} className="bg-light px-5 py-4 mt-3" style={{marginBottom:"3%"}}>

                  <span className='d-flex'>
                    <IoIosArrowBack size="20px" color="gray" style={{cursor:"pointer"}} onClick={()=> window.history.back()} className='mt-2'/>
                    <h3 className='f-flex mx-auto text-center pb-3'> New Customer </h3>
                   </span>

                   <Form onSubmit={(e)=>handleRegistration(e)}>
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
                                    NAME *
                                  </span>{" "}
                                  <br />
                                  <input
                                    type='text'
                                    className="w-100 bg-light py-1"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={registrationData.name}
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
                                    Email Address *
                                  </span>{" "}
                                  <br />
                                  <input
                                    type='email'
                                    className="w-100 bg-light py-1"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={registrationData.email}
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
                                    PHONE *
                                  </span>{" "}
                                  <br />
                                  <input
                                   type='number'
                                    className="w-100 bg-light py-1"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={registrationData.phone}
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
                                    type='password'
                                    className="w-100 bg-light py-1"
                                    name="password"
                                    placeholder="Enter your name"
                                    value={registrationData.password}
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
                                    CONFIRM PASSWORD *
                                  </span>{" "}
                                  <br />
                                  <input
                                    type='password'
                                    className="w-100 bg-light py-1"
                                    name="confirmPassword"
                                    placeholder="Enter your name"
                                    // value={registrationData.confirmPassword}
                                    required
                                   
                                    style={{
                                      borderBottomWidth: "1.5px",
                                      borderBottomColor:"gray",
                                      borderTopWidth: "0px",
                                      borderRightWidth: "0px",
                                      borderLeftWidth: "0px",
                                    }}
                                    // onChange={(e)=>handleChange(e)}
                                  />
                                </Col>
                          </Row>  
                           <Row>
                            <Col>
                              <span className='d-flex justify-content-start'>
                                  <p className='pt-4 text-uppercase text-decoration-underline' style={{cursor:"pointer", fontSize:"12px", color:"gray"}} onClick={()=>navigate("/emailverification")}> enter otp to verify email </p>
                              </span>
                              <span className='d-flex justify-content-end'>
                                  <Button className='bg-dark border-0 rounded-0 px-4 fs-6 fw-light' type='submit'>REGISTER NOW</Button>
                              </span>
                            </Col>
                          </Row>
                    </Form>
              </Col>
        <Col lg={3} xs={0}>
        </Col>
      </Row>          
    </Container>
  </>
  )
}

export default SignupPage
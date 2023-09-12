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
import { emailVerify } from '../../store/actions'

const EmailOtp = () => {
  // Disable back button
  window.history.pushState(null, "", window.location.href);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectorLoginData = useSelector((state)=> state)

  if(selectorLoginData?.adminReducer?.EmailVerify?.verificationDetails!==null){
    navigate("/login")
  }

  // console.log("all response:", selectorLoginData)

  // console.log("Client:----", selectorLoginData?.adminReducer?.ClientSignup?.clientDetails?.email)
  // const {login} = useAuth();
  const [otp, setOtp] = useState();
  var otpVerification = {};

  const handleSubmit = (e) => {
    e.preventDefault();
    otpVerification = {
      email: selectorLoginData?.adminReducer?.ClientSignup?.clientDetails?.email,
      otp: otp,
    }
    // console.log("OTP Verification:", otpVerification)
    dispatch(emailVerify(otpVerification))
  }
  
  return (
  <>
   <Container fluid style={{backgroundColor:"#efefef"}}>
          <Row>
            <Col lg={3} xs={1}>
            </Col>

            <Form onSubmit={(e)=>handleSubmit(e)}>
            <Col lg={6} className="bg-light px-5 py-4 mt-4 mx-auto" style={{marginBottom:"3%"}}>

                   <h3 className='f-flex mx-auto text-center'>Verify Email</h3>
                   
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
                                   Enter OTP
                                  </span>{" "}
                                  <br />
                                  <input
                                    className="w-100 bg-light py-1"
                                    name="otp"
                                    placeholder="Enter valid otp"
                                    value={otp}
                                   
                                    style={{
                                      borderBottomWidth: "1.5px",
                                      borderBottomColor:"gray",
                                      borderTopWidth: "0px",
                                      borderRightWidth: "0px",
                                      borderLeftWidth: "0px",
                                    }}
                                    onChange={(e)=>setOtp(e.target.value)}
                                  />
                                </Col>
                          </Row>  
                   
                    
                          <Row>
                            <Col className='d-flex justify-content-end'>
                                    <Button type="submit" className='py-1 mt-4 border-0 rounded-0 px-4 fs-6 fw-light' style={{backgroundColor:"#b02e46"}}>Verify</Button>
                            </Col>
                          </Row>
                          <p className='mt-2' style={{cursor:"pointer", fontSize:"12px", color:"gray"}} onClick={()=>navigate("/signup")}>Don't have an account? Click Here </p>
              </Col>
            </Form>
        <Col lg={3} xs={0}>
        </Col>
      </Row>          
    </Container>
  </>
  )
}

export default EmailOtp;
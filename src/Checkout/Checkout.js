import React from "react";
import Banner from "./Banner";
import fruit from "./Assets/fruit.png";
import "./checkout.css"
import { Container, Row, Col, Button, Accordion, AccordionBody, AccordionHeader, AccordionItem, Form } from "reactstrap";
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux";
import Tick from "./Assets/tick.png"
import { useNavigate } from "react-router";
import { NotificationManager } from "react-notifications";
import { clientOrder, currentClientData } from "../store/actions";
import { useEffect } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allResponse = useSelector((state)=> state);
  // console.log("response:", allResponse)

  const selectedProducts = useSelector((state)=> state?.adminReducer?.CartProducts?.productDetail)
  // console.log("selected Products:", selectedProducts)

  const clientDetails = allResponse?.adminReducer?.ClientLogin;
  // console.log("Client Details:", clientDetails)

  const clientCreds = JSON.parse(localStorage.getItem("client"));

  let cartItems = allResponse?.adminReducer?.CartProducts?.items;
  // console.log("Cart Items:", cartItems)

  const logInCheck = useSelector((state)=> state?.adminReducer?.ClientLogin?.token)
  // console.log("Login Check:", logInCheck)

  const orderSuccess = allResponse?.adminReducer?.ClientOrder?.success;
  // console.log("orderSuccess:", orderSuccess)

  if(orderSuccess===true || orderSuccess==="true"){
    localStorage.removeItem("cart-products")
    localStorage.removeItem("items")

    setTimeout(redirect, 800);
    function redirect(){
      // console.log("reloading..")
      window.location.reload();
    }
  }

  useEffect(()=>{
    const success = localStorage.getItem("order-status");
    if(success===true || success==="true"){
      navigate("/success")
    }
    // console.log("after login ran")
  }, [])

  useEffect(()=>{
    if(logInCheck===null || logInCheck===undefined){
      NotificationManager.info("Login before Placing Order")
      navigate("/login")
    }
  }, [logInCheck])

  if(typeof cartItems === "string"){
    cartItems = JSON.parse(cartItems)
    // console.log("Cart Items:", cartItems)
  }

  // var productItems = [];
  // selectedProducts?.map((product)=>{
  //   productItems?.push({productId: Number(product?.id), quantity:1});
  // })
  // console.log("product items:", productItems)

  
  // else{
  //   navigate("/checkout")
  // }

  const formData = new FormData();
  const [clientOrderDetails, setClientOrderDetails] = useState({
    accountEmail:"",
    name: clientCreds?.name,
    phone:"",
    address:"",
    city:"",
    delievryNote:"",
    normalDelievery:"",
    token: logInCheck || "",
    items: cartItems || [],
  })

  // regular expression
  const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  // var totalPrice = 0;
  // selectedProducts?.map((product, index)=>{
  //   totalPrice += parseInt(product?.price)
  //   console.log("total:", totalPrice)
  // })

  // var totalPrice=0
  // selectedProducts?.length>0 && selectedProducts?.map((product, index)=>{
  //   totalPrice += (product?.price * cartItems[index].quantity);
  // })

  if (typeof cartItems !== "object"){
    cartItems = JSON.parse(cartItems);
    // console.log("json cart items:", cartItems)
  }

  var totalPrice=0
  if(cartItems!==null){
    selectedProducts?.length>0 && selectedProducts?.map((product, index)=>{
      totalPrice += parseInt(((product?.price - (product?.discount/100 * product?.price)) * cartItems[index].quantity));
    })
  }

  var originalPrice = 0;
  if(cartItems!==null){
    selectedProducts?.length>0 && selectedProducts?.map((product, index)=>{
      originalPrice += parseInt(((product?.price) * cartItems[index].quantity));
    })
  }
  
  // console.log("price without discount checkout:", originalPrice)


  //  Accordion Toggle
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };


  const handleChange = (e) => {
    const {name, value} = e.target;
    setClientOrderDetails({
      ...clientOrderDetails,
      [name]: value
    })
  }

  function handlePlaceOrder(e){
    // console.log("Client Details order:", clientOrderDetails);
    e.preventDefault();
    // dispatch(currentClientData(clientOrderDetails))
  
    setClientOrderDetails({
      ...clientOrderDetails,
      token: logInCheck
    })

    if(clientOrderDetails?.phone==="" || clientOrderDetails?.address==="" || clientOrderDetails?.city==="" || clientOrderDetails?.delievryNote===""){
      alert("Please fill out the form")
    }



    // console.log("Order:", clientOrderDetails)
    dispatch(clientOrder(clientOrderDetails))

  }

  return (
    <>
      <Banner />
      <Container fluid>
        <Row className="m-4 gx-3 gy-3">
          <Col lg={8} md={12} sm={12} xs={12}>

            <Form onSubmit={(e)=>handlePlaceOrder(e)}>
            <div className="products-section">
              <Row
                className="py-3 text-uppercase"
                style={{ overFlowX: "scroll", marginRight:"10px" }}
              >
                <Col lg={1} xs={1}>
                  <b style={{fontSize:"0.9rem"}}>1.</b>
                </Col>

                <Col lg={11} xs={11} className="text-capitalize">
                  <b style={{fontSize:"0.9rem"}}>Account</b> <br />
                  <span
                    className="text-lowercase"
                    style={{
                      fontSize: "13px",
                      color: "gray",
                      lineHeight: "10px",
                    }}
                  >
                    {clientCreds?.email}
                    {/* johndoe@example.com */}
                  </span>{" "}
                  <br />
                  <span className="d-flex">
                  {/* <input
                    className="w-100 bg-light accountEmail"
                    name="accountEmail"
                    // value={clientOrderDetails.accountEmail}
                    value={clientDetails?.email}
                    type="email"
                    // required

                    style={{
                      borderBottomWidth: "1px",
                      borderTopWidth: "0px",
                      borderRightWidth: "0px",
                      borderLeftWidth: "0px",
                    }}
                    onChange={(e)=>handleChange(e)}
                  /> */}
                   { regexExp.test(clientOrderDetails.accountEmail) ? <img src={Tick} alt="" /> : "" } 
                  </span>
                </Col>
              </Row>

              <Row
                className="py-3 text-uppercase"
                style={{ overFlowX: "scroll" }}
              >
                <Col lg={1} xs={1}>
                  <b style={{fontSize:"0.9rem"}}>2.</b>
                </Col>

                <Col lg={11} xs={11} className="text-capitalize">
                <Accordion open={open} toggle={toggle} className="border-0">
                    <AccordionItem className="border-0 bg-transparent" style={{marginLeft:"-20px", marginTop:"-12px"}}>
                      <AccordionHeader targetId="3" className="">
                        <b style={{fontSize:"0.9rem"}}>Confirm Shipping Details</b> <br />
                      </AccordionHeader>
                      <AccordionBody accordionId="3">
                      <Row className="my-3">
                                <Col lg={6} md={12} sm={6}>
                                  <span
                                    className="text-capitalize"
                                    style={{
                                      fontSize: "13px",
                                      color: "gray",
                                      lineHeight: "10px",
                                    }}
                                  >
                                    Name
                                  </span>{" "}
                                  <br />
                                  <input
                                    className="w-100 bg-light"
                                    name="name"
                                    placeholder="John Doe"
                                    type="text"
                                    value={clientOrderDetails.name}
                                    required

                                    style={{
                                      borderBottomWidth: "1px",
                                      borderTopWidth: "0px",
                                      borderRightWidth: "0px",
                                      borderLeftWidth: "0px",
                                    }}
                                    onChange={(e)=>handleChange(e)}
                                  />
                                </Col>
                                <Col lg={6} md={12} sm={6}>
                                  <span
                                    className="text-capitalize"
                                    style={{
                                      fontSize: "13px",
                                      color: "gray",
                                      lineHeight: "10px",
                                    }}
                                  >
                                    Phone
                                  </span>{" "}
                                  <br />
                                  <input
                                    placeholder="0900-78601"
                                    className="w-100 bg-light"
                                    type="number"
                                    name="phone"
                                    value={clientOrderDetails.phone}
                                    required

                                    style={{
                                      borderBottomWidth: "1px",
                                      borderTopWidth: "0px",
                                      borderRightWidth: "0px",
                                      borderLeftWidth: "0px",
                                    }}
                                    onChange={(e)=>handleChange(e)}
                                  />
                                </Col>
                              </Row>

                              <Row className="my-3">
                                <Col lg={6} md={12} sm={6}>
                                  <span
                                    className="text-capitalize"
                                    style={{
                                      fontSize: "13px",
                                      color: "gray",
                                      lineHeight: "10px",
                                    }}
                                  >
                                    Address
                                  </span>{" "}
                                  <br />
                                  <input
                                    className="w-100 bg-light"
                                    placeholder="lorem Ipsum"
                                    type="text"
                                    name="address"
                                    value={clientOrderDetails.address}
                                    required

                                    style={{
                                      borderBottomWidth: "1px",
                                      borderTopWidth: "0px",
                                      borderRightWidth: "0px",
                                      borderLeftWidth: "0px",
                                    }}
                                    onChange={(e)=>handleChange(e)}
                                  />
                                </Col>
                                <Col lg={6} md={12} sm={6}>
                                  <span
                                    className="text-capitalize"
                                    style={{
                                      fontSize: "13px",
                                      color: "gray",
                                      lineHeight: "10px",
                                    }}
                                  >
                                    City
                                  </span>{" "}
                                  <br />
                                  <input
                                    placeholder="Lorem typsum"
                                    className="w-100 bg-light"
                                    name="city"
                                    value={clientOrderDetails.city}
                                    type="text"
                                    required

                                    style={{
                                      borderBottomWidth: "1px",
                                      borderTopWidth: "0px",
                                      borderRightWidth: "0px",
                                      borderLeftWidth: "0px",
                                    }}
                                    onChange={(e)=>handleChange(e)}
                                  />
                                </Col>
                              </Row>

                              <Row className="my-3 text-capitalize">
                                <Col lg={12}>
                                <span
                                style={{
                                  fontSize: "13px",
                                  color: "gray",
                                  lineHeight: "10px",
                                }}
                              >
                              Delievery Note Optional
                              </span>{" "}
                              <br />
                              <input
                              placeholder="Type Here..."
                                className="w-100 bg-light"
                                type="text"
                                name="delievryNote"
                                value={clientOrderDetails.delievryNote}
                                required

                                style={{
                                  borderBottomWidth: "1px",
                                  borderTopWidth: "0px",
                                  borderRightWidth: "0px",
                                  borderLeftWidth: "0px",
                                }}
                                onChange={(e)=>handleChange(e)}
                              />
                                </Col>
                              
                              </Row>
                      </AccordionBody>
                    </AccordionItem>
                </Accordion>

                </Col>
              </Row>

              <Row
                className="pt-1 mb-1 text-uppercase"
                style={{ overFlowX: "scroll" }}
              >
                <Col lg={1} xs={1}>
                  <b style={{fontSize:"0.9rem"}}>3.</b>
                </Col>

                <Col lg={11} xs={11} className="text-capitalize">
                <Accordion open={open} toggle={toggle} className="border-0">
                    <AccordionItem className="border-0 bg-transparent" style={{marginLeft:"-20px", marginTop:"-12px"}}>
                      <AccordionHeader targetId="4" className="">
                        <b style={{fontSize:"0.9rem"}}>Order Summary</b> <br />
                      </AccordionHeader>
                      <AccordionBody accordionId="4">
                       <TableContainer component={Paper} style={{width:"100%"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow >
                              <TableCell align="left">NO</TableCell>
                              <TableCell align="left">PRODUCT</TableCell>
                              <TableCell align="left">DESCRIPTION&nbsp;(g)</TableCell>
                              <TableCell align="left">QUANTITY&nbsp;(g)</TableCell>
                              <TableCell align="left">PRICE&nbsp;(g)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedProducts?.map((row, index) => (
                              <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {index+1}
                                </TableCell>
                                <TableCell align="left"><img src={row?.productimages[0]?.url} style={{width:"100%", height:"80px"}} alt="" /></TableCell>
                                <TableCell align="left">{row?.description}</TableCell>
                                <TableCell align="left">{cartItems[index].quantity}</TableCell>
                                <TableCell align="left">{row?.price - (row?.discount/100 * row?.price)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                       </TableContainer>

                       <Row className="d-flex justify-content-end mt-4">
                        <Col lg={5}>
                              <div className="d-flex justify-content-between" style={{color:"gray"}}>
                                <p>Delievery Fee</p>
                                <p>  Rs. 230</p>
                              </div>

                              <div className="d-flex justify-content-between" style={{color:"gray"}}>
                                <p style={{fontWeight:"500", color:"black"}}> Total </p>
                                <p style={{fontWeight:"500", color:"black"}}> {totalPrice+230} </p>
                              </div>
                              <hr style={{border:"1px solid black"}} />
                              
                        </Col>
                       </Row>
                      </AccordionBody>
                    </AccordionItem>
                </Accordion>

                </Col>
              </Row>

              <Row className="d-flex justify-content-end mx-2">
                <Col lg={3} md={4} sm={6} xs={12} className="mt-4">
                <Button className="bg-dark w-100 rounded-0 border-0" type="submit">
                  Place Order
                </Button>
                </Col>
                {/* <Col lg={3} md={4} sm={8} xs={12} className="d-flex justify-content-end"> <Button className=" w-100 border-0 bg-dark">Clear Cart</Button> </Col> */}
              </Row>
            </div>
          </Form>

          </Col>
          <Col lg={4} md={12} sm={12} xs={12}>
            <div
              className="cart-total p-3 m-1"
              style={{ backgroundColor: "#ECECEC" }}
            >
              <h6 className="mb-3">Cart Total</h6>
              <span className="d-flex justify-content-between">
                {" "}
                <p>Total Items</p> <p>{selectedProducts?.length}</p>{" "}
              </span>
              <span className="d-flex justify-content-between">
                {" "}
                <p>Total</p> <b>Rs. {totalPrice} </b>{" "}
              </span>

              <hr style={{color:"gray", border:"1px solid"}}/>
              <h6 className="mb-3">Shipping Mode</h6>
              <span className="d-flex justify-content-between">
                 <p style={{fontSize:"0.8rem", fontWeight:"700"}}>Normal Delievery (PKR 230.00)</p>
                 {/* <input className="mb-3" style={{color:"red"}} type="radio" name="normalDelievery" onChange={(e)=>handleChange(e)}/> */}
              </span>
              <p style={{fontSize:"0.8rem", lineHeight:"1px", fontWeight:"400", color:"gray"}}>Same day delievery if ordered before 12pm</p>
             
              <hr style={{color:"gray", border:"1px solid"}}/>
              <h6 className="mb-3">Payment Method</h6>
              <span className="d-flex justify-content-between">
              <p className="mt-1" style={{fontSize:"0.8rem", lineHeight:"1px", fontWeight:"400", color:"gray"}}>Same day delievery if ordered before 12pm</p>
                 {/* <input className="mb-3" style={{color:"red"}} type="radio" /> */}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;

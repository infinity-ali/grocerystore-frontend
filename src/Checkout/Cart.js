import React, { useEffect } from "react";
import Banner from "./Banner";
import fruit from "./Assets/fruit.png";
import { Container, Row, Col, Button } from "reactstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart } from "../store/actions";
import { useNavigate } from "react-router";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { increaseProductQuantity, decreaseProductQuantity } from "../store/actions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Cart = () => {
  const navigate = useNavigate();
  const [productCounter, setProductCounter] = useState(1);

  const products = useSelector((state)=>state);
  // console.log("products:", products)

  const cartProducts = products?.adminReducer?.CartProducts?.productDetail;
  // console.log("Cart Products:", cartProducts)

  let cartItems = products?.adminReducer?.CartProducts?.items;
  // console.log("Cart Items:", cartItems)

  if (typeof cartItems !== "object"){
    cartItems = JSON.parse(cartItems);
    // console.log("json cart items:", cartItems)
  }

  var totalPrice=0
  if(cartItems!==null){
    cartProducts?.length>0 && cartProducts?.map((product, index)=>{
      totalPrice += parseInt(((product?.price - (product?.discount/100 * product?.price)) * cartItems[index].quantity));
    })
  }

  let disable = false;
  if(cartProducts.length===0){
    disable=true;
  }

  // useEffect(()=>{
  //   dispatch(getProductCart())
  // }, [cartProducts])

  // var totalPrice = 0;
  // cartProducts?.map((product, index)=>{
  //   totalPrice += parseInt(product?.price)
  //   console.log("total:", totalPrice)
  // })

  const logInCheck = useSelector((state)=> state?.adminReducer?.ClientLogin?.token)
  // console.log("Login Check:", logInCheck)

  const dispatch = useDispatch();

  const handleRemoveProduct = (id) => {
    dispatch(removeProductFromCart(id))
  }

  function handleRedirectCheckout(){
    if(logInCheck===null || logInCheck===undefined){
      NotificationManager.info("Login before Placing Order")
      navigate("/login")
    }
    else{
      navigate("/checkout")
    }
     
  }

  const handleQuantityIncrease = (id) => {
    dispatch(increaseProductQuantity(id));
  }

  const handleQuantityDecrease = (id) => {
    dispatch(decreaseProductQuantity(id))
  }

  return (
    <>
      <Banner />

      <Container fluid>
        <Row className="m-4">
          <Col lg={8} md={12} sm={12} xs={12}>
            <div className="products-section">

            <TableContainer component={Paper} style={{width:"100%"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow >
                              <TableCell align="left">PRODUCT</TableCell>
                              <TableCell align="left">NAME&nbsp;(g)</TableCell>
                              <TableCell align="left">PRICE&nbsp;(g)</TableCell>
                              <TableCell align="left">QUANTITY&nbsp;(g)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              cartProducts?.length===0 ? 
                              <h6 className="mx-3 my-2">No Products In the Cart</h6>
                              :
                            cartProducts?.map((product, index) => (
                              <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                <img
                                    src={product?.productimages[0]?.url}
                                    style={{
                                      width: "100%",
                                      height: "100px",
                                      padding: "4%",
                                      objectFit:"contain",
                                      backgroundColor: "#ECECEC",
                                    }}
                                    alt=""
                                    />
                                </TableCell>
                                <TableCell align="left"> <p className="mx-3 align-self-center mt-3">{product.title}</p> </TableCell>
                                <TableCell align="left"> ${product?.price - (product?.discount/100 * product?.price)} </TableCell>
                                <TableCell align="left">
                                <Button
                                      className="bg-light text-dark border-0 fs-4"
                                      onClick={()=>handleQuantityDecrease(index)}
                                       >
                                      {" "}
                                      -{" "}
                                      </Button>{" "}
                                      {cartItems[index]?.quantity} {" "}
                                      <Button
                                        className="bg-light text-dark border-0 fs-4"
                                        onClick={()=>handleQuantityIncrease(index)}
                                      >
                                        {" "}
                                        +{" "}
                                    </Button>{" "}
                                </TableCell>
                                <TableCell>
                                <Button className="bg-light text-dark border-1 border-dark" onClick={()=>handleRemoveProduct(index)}>
                                  {" "}
                                  X{" "}
                                </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
              </TableContainer>
              {/* <Row className="border border-1 border-dark p-3 p text-uppercase" style={{overFlowX:"scroll"}}>
                <Col lg={4} md={4} sm={12} xs={12}>Product</Col>
                <Col lg={2} md={2} sm={12} xs={12}>Price</Col>
                <Col lg={2} md={2} sm={12} xs={12}>Quantity</Col>
                <Col lg={2} md={2} sm={12} xs={12}></Col>
              </Row> */}

             
              {/* {
                cartProducts?.length===0 ? 
                <h5 className="d-flex my-3">No Products in the Cart</h5>
                :
                 cartProducts?.map((product, index)=>{
                 return <Row className="border border-1 border-dark px-3 p-3" key={index}>
                  <Col lg={4} md={4} sm={6} xs={6}>
                    <span className="d-flex">
                      <img
                        src={product?.productimages}
                        style={{
                          width: "100%",
                          height: "100px",
                          padding: "4%",
                          backgroundColor: "#ECECEC",
                        }}
                        alt=""
                      />
                      <p className="mx-3 align-self-center mt-3">{product.title}</p>
                    </span>
                  </Col>
                  <Col lg={2} md={2} sm={12} xs={12} className="align-self-center">
                    {product?.price - product?.discount}
                  </Col>
                  <Col lg={2} md={2} sm={12} xs={12} className="align-self-center">
                    <u>
                      {" "}
                      <Button
                        className="bg-light text-dark border-0 fs-4"
                        onClick={()=>handleQuantityIncrease(index)}
                      >
                        {" "}
                        +{" "}
                      </Button>{" "}
                      {product?.quantity} {" "}
                      <Button
                        className="bg-light text-dark border-0 fs-3"
                        onClick={()=>handleQuantityDecrease(index)}
                      >
                        {" "}
                        -{" "}
                      </Button>{" "}
                    </u>
                  </Col>
                  <Col lg={2} md={2} sm={12} xs={12} className="align-self-center">
                    500
                  </Col>
                  <Col lg={2} md={2} sm={12} xs={12} className="align-self-center">
                   
                  </Col>
                </Row>
                })
              } */}
           


              {/* <Row className="d-flex justify-content-end">
                <Col lg={3} md={4} sm={6} xs={12} className="p-0">
                <Button disabled={disable} className="bg-dark w-100 my-4 border-0 rounded-0">
                  Clear Cart
                </Button>
                </Col>
            </Row> */}
            </div>
          </Col>

          <Col lg={4} md={12} sm={12} xs={12}>
            <div
              className="cart-total p-3 m-1"
              style={{ backgroundColor: "#ECECEC" }}
            >
              <h6 className="mb-3">Cart Total</h6>
              <span className="d-flex justify-content-between">
                {" "}
                <p>Total Items</p> <p>{cartProducts?.length}</p>{" "}
              </span>
              <span className="d-flex justify-content-between">
                {" "}
                <p>Total</p> <b>{totalPrice}</b>{" "}
              </span>
              <Button disabled={disable} className="bg-dark d-grid w-50 border-0 mx-auto rounded-0" onClick={handleRedirectCheckout}>
                {" "}
                Checkout{" "}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;

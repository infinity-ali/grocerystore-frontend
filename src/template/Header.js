import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { json, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputGroup, Input, InputGroupText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, } from "reactstrap";
import { GoSearch } from 'react-icons/go';
import Logo from "./Assets/jiff.png"
import "./header.css"
import Fruit from "./Assets/fruit.png"
import Domain from '../lib/config';
import { useNavigate } from "react-router-dom";
import NotificationManager from "react-notifications/lib/NotificationManager";
import {
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody, Row, Col, Container
} from "reactstrap"
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineClose} from 'react-icons/ai';
import { ImBin} from 'react-icons/im';
import { GrFormClose} from 'react-icons/gr';
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart, removeProductFromCart, increaseProductQuantity, decreaseProductQuantity, getProductsList} from "../store/actions";
import { GrLogin } from 'react-icons/gr';
import { BsPencilSquare } from 'react-icons/bs';
import { SlLogout } from 'react-icons/sl';

function Header() {

  useEffect(()=>{
    dispatch(getProductsList());
  }, [])

  const logInCheck = useSelector((state)=> state?.adminReducer?.ClientLogin?.token)
  // console.log("Login Check:", logInCheck)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state)=>state);
  // console.log("products:", products)

  const allProducts = products?.adminReducer?.AdminProducts?.rows;
  // console.log("All Products:", allProducts)

  const cartProducts = products?.adminReducer?.CartProducts?.productDetail;
  // console.log("Cart Products:", cartProducts)

  let cartItems = products?.adminReducer?.CartProducts?.items;
  // console.log("Cart Items:", cartItems)

  if (typeof cartItems !== "object"){
    cartItems = JSON.parse(cartItems);
    // console.log("json cart items:", cartItems)
  }

  let disable = false;
  if(cartProducts?.length===0 || cartProducts===null){
    disable=true;
  }

  // useEffect(()=>{
  //   dispatch(getProductCart())
  // }, [cartProducts])

  var totalPrice=0
  if(cartItems!==null && cartItems?.length>0 && cartProducts !==null ){
    cartProducts?.length>0 && cartProducts?.map((product, index)=>{
      totalPrice += parseInt(((product?.price - (product?.discount/100 * product?.price)) * cartItems[index]?.quantity));
    })
  }

  var originalPrice = 0;
  if(cartItems!==null && cartItems?.length>0 && cartProducts !==null ){
    cartProducts?.length>0 && cartProducts?.map((product, index)=>{
      originalPrice += parseInt(((product?.price) * cartItems[index].quantity));
    })
  }
  // console.log("price without discount:", originalPrice)
  // console.log("total price:", totalPrice)

  

  // console.log("Selector: header:", cartProducts)

  const [openedDrawer, setOpenedDrawer] = useState(false)

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }

  // Modal open state
  const [modal, setModal] = useState(false);
  
  // Toggle for Modal
  const toggle = () => {
    setModal(!modal)
  }

  const handleRemoveProduct = (id) => {
    dispatch(removeProductFromCart(id))
    // const deleteOne = cartProducts.length-1;
    // cartProducts.length = deleteOne;
  }

  function handleViewCart(){
    navigate('/cart')
  }

  function handleCheckoutRedirect(){
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

  function handleLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("client");
    localStorage.removeItem("cart-products")
    localStorage.removeItem("items")
    window?.location?.reload();
    // navigate("/");
  }

  const [productSearch, setProductSearch] = useState("");
  // console.log("productSearch:", productSearch)
  const handleProductSearch = (e) => {

    // document.addEventListener('mousedown', function(e) {
    //   var container = document.getElementById('text-area');
    //   if (!container.contains(e.target)) {
    //       container.style.display = 'reset';
    //   }
    // });

    setProductSearch(e.target.value);
    // console.log("product search:", productSearch)
  }

  const handleProductDetail = (id) =>{
    // history.push(`/products/${id}`);
    navigate(`/products/${id}`);
  }

  // hide text area on click
  
  document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('text-area');
    if (!container.contains(e.target)) {
        setProductSearch("")
    }
  });


  
  return (
    <header style={{backgroundColor:"#f2f2f2"}}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">

        <Link to="/" className="logo-img">
        <img className="mx-2" src={Logo} alt="" style={{cursor:"pointer"}} />
        </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            {/* <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link fw-bold" replace onClick={changeNav}>
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={()=>window.location.replace("http://localhost:3001/")} className="nav-link  fw-bold">
                  Admin
                </Link>
              </li>
               <br />
            </ul> */}

            <InputGroup className="search-field d-flex d-flex mx-auto">
                <Input placeholder="Enter keyword here.." onChange={(e)=>handleProductSearch(e)}/>
    
                <div className="search-section" id="text-area" style={{position: "absolute", marginTop:"6%", backgroundColor:"white", 
                            boxShadow:"1px 1px 2px gray", zIndex:"1",
                  width:"100%", borderBottomLeftRadius:"12px", borderBottomRightRadius:"12px"}}>
                    {
                      allProducts && allProducts?.filter((product)=>{
                        if(productSearch===null || productSearch===undefined || productSearch==="" || productSearch===0){
                          return ""
                      }
                      else{
                        // console.log("product filter:", product)
                         return (product?.title?.toLowerCase().includes(productSearch?.toLowerCase()))
                      }
                      }).map((products)=>{
                       return <p style={{cursor:"pointer"}} className="search-product" onClick={()=>handleProductDetail(products?.id)}> {products?.title || ""}  </p>
                      })
                    }
                </div>

                <InputGroupText style={{backgroundColor:"#b02e46"}}>
                <GoSearch size={18} onClick="" style={{color:"white", cursor:"pointer"}}/>
                </InputGroupText>
                <Button className="navbar-toggle-button bg-light text-dark border-0" onClick={toggleDrawer}>
                  <GrFormClose size="30px"/>
                </Button>
            </InputGroup>

            <button type="button" style={{color:"gray"}} className="btn d-none d-lg-inline" onClick={toggle}>
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-1 badge rounded-pill" style={{backgroundColor:"#b02e46"}}>{cartProducts?.length}</span>
            </button>

            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  // href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                  
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="/login" className="dropdown-item">
                    <GrLogin /> <span className="mx-1" style={{fontSize:"15px"}}> Login </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="dropdown-item">
                    <BsPencilSquare /> <span className="mx-1" style={{fontSize:"15px"}}> Signup </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item">
                    <SlLogout /> <span className="mx-1" style={{fontSize:"15px"}} onClick={handleLogout}> Logout </span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* These are collaped buttons */}
          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-light" onClick={toggle}>
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} color="gray" />
              <span className="ms-1 badge rounded-pill" style={{backgroundColor:"#b02e46"}}>{cartProducts?.length}</span>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal Body */}
      <div> 
          <Modal isOpen={modal}
              className="products-modal-body"
              toggle={toggle}
              modalTransition={{ timeout: 200 }}>
                <ModalBody className="">
                  <Container className="px-4 rounded-0">
                  <span className="d-flex justify-content-between">
                      <span className="d-flex justify-content-between">
                        <FaShoppingCart fontSize={18} color="#b02e46"/>
                        <p className="mx-1" style={{color:"#b02e46", fontSize:"12px", fontWeight:"700"}}>{cartProducts?.length} items</p>
                      </span>
                      
                      <AiOutlineClose fontSize={18} onClick={()=>toggle()} style={{cursor:"pointer"}}/>
                  </span>
                  <hr style={{margin:"0", padding:"0"}}/>

                  {/* Cart Products */}
                  {
                    cartProducts?.length === 0 || cartProducts === null ? 
                    <h6 className="my-3">No Products Selected</h6>
                    :
                    cartProducts?.map((products, index)=>{
                      return     <Row className="mt-1 m-0">
                      <Col lg={3} md={11} xs={12} className="p-0 my-1" style={{backgroundColor:"#EBECF0"}}>
                        <img className="mt-3" src={products?.productimages[0]?.url} style={{width:"100%"}} alt="" />
                      </Col>
                      <Col lg={7} md={11} xs={12} className="my-1">
                          <span style={{fontSize:"12px"}}>
                             <p className="m-0 mx-1"> {products?.title} </p>
                             <s className="mx-1">{products?.price}</s> <span style={{fontWeight:"bold"}}>  ${products?.price - (products?.discount/100 * products?.price)} </span> <br />
                             <span className="d-flex justify-content-start mt-1"> 
                              <Button className="mx-2 rounded-0" size="sm" style={{backgroundColor:"#b02e46", border:"0", fontWeight:"800"}} onClick={()=>handleQuantityDecrease(index)}>-</Button>
                              {cartItems===null ? 0 : cartItems[index]?.quantity}
                              <Button className="mx-2 rounded-0" size="sm" style={{backgroundColor:"#b02e46", border:"0", fontWeight:"800"}} onClick={()=>handleQuantityIncrease(index)}>+</Button> 
                              <Button className="mx-2 rounded-0" size="sm" style={{backgroundColor:"#b02e46", border:"0"}} onClick={()=>handleRemoveProduct(index)}>  <ImBin/> </Button>
                              <div className="w-100 d-flex justify-content-end">
                              <GrFormClose className="d-flex justify-right" style={{cursor:"pointer"}} onClick={()=>handleRemoveProduct(index)} />
                              </div>
                             </span>
                            
                          </span>
                      </Col>
                      {/* <Col lg={2} md={3}></Col> */}
                    </Row>
                    })
                  }
              
                  </Container>
              
                  <Row className="mt-3 sub-total-modal d-flex align-items-center">
                    <Col lg={12}>
                      <span className="d-flex justify-content-between mx-3">
                        <p className="mt-2" style={{fontSize:"14px", fontWeight:"500"}}>Subtotal</p>
                        <p className="mt-2" style={{fontSize:"14px", fontWeight:"500"}}>Rs. {totalPrice|| "0 Rs"}</p>
                      </span>
                    </Col>
                  </Row>
                  <Button disabled={disable} className="w-100 my-2 bg-dark border-0 rounded-0" onClick={handleViewCart}>View Cart</Button> <br />
                  <Button disabled={disable} onClick={handleCheckoutRedirect} className="w-100 bg-dark border-0 rounded-0" >Checkout</Button> <br />
                </ModalBody>
          </Modal>
      </div >
    </header>
  );
}

export default Header;

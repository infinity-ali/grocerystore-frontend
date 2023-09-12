import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {Row, Col, Container} from "reactstrap"
import {Card, CardBody, CardHeader, CardText, CardTitle, Spinner} from "reactstrap"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Carousel from "react-elastic-carousel";
import { FaHamburger } from 'react-icons/fa';
import { GiPopcorn } from 'react-icons/gi';
import { BsBasket } from 'react-icons/bs';
import { TbMeat } from 'react-icons/tb';
import { GiFruitBowl } from 'react-icons/gi';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { GiFrozenBlock } from 'react-icons/gi';
import { CgSmartHomeCooker } from 'react-icons/cg';
import Fruits from "./Assets/fruit.png"
import "./landing.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from "react-redux";
import {getProductsList, getProductCategory, getSingleCategory} from '../store/actions';
import { useNavigate } from "react-router-dom";
import { yellow } from "@mui/material/colors";

// const style = {
//   position: 'absolute',
//   top: '15%',
//   // left: '20%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// slider
const breakPoints = [
  {width:1, itemsToShow: 1},
  {width:550, itemsToShow: 2},
  {width:768, itemsToShow: 4},
  {width:1200, itemsToShow: 5},
  {width:1600, itemsToShow: 6}
]

function Landing() {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.removeItem("order-status")
    dispatch(getProductsList());
    dispatch(getProductCategory());
    dispatch(getSingleCategory(3));
  }, [])

  const [productCategory, setProductCategory] = useState();
  const productCats = ["Shoes", "Watches", "Gadgets", "Food Items", "Hoodies", "Pizzas", "Books", "miscellaneous"]
  const [red, silver, green] = ["#F5D2D2", "#D5DDE0", "#F7EfDF"]


  const response = useSelector((store)=> store);
  // console.log("All Response:", response);

  const singleProduct5 = response?.adminReducer?.SingleProductCategory?.singleCategory;
  // console.log("single product detail:", singleProduct5)

  const productsLoading = response?.adminReducer?.AdminProducts?.loading;
  // console.log("products-Loading:", productsLoading)
  
  const products = response?.adminReducer?.AdminProducts?.rows;

  const categories = response?.adminReducer?.ProductCategory?.categories?.rows;
  // console.log("Categories:", categories)

  const categoryLoading = response?.adminReducer?.ProductCategory?.Loading;
  // console.log("category loading:", categoryLoading);

  const handleProductDetails = (id) => {
    navigate(`products/${id}`)
  }

  const handleCategory = (id) => {
    // localStorage.setItem("categoryId", JSON.stringify(id))
    navigate(`/category/${id}`)
    // navigate(`/category`)
  }

  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      {/* <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse products
          </Link>
        </div>
      </div> */}

      {/* Category Section */}
      <Container className="p-4" fluid style={{backgroundColor:"#efefef"}}>
      <div className="container my-3 bg-light p-4">
          <h3>Product Categories</h3>
          <hr />
          <Row>
            {
              categoryLoading===true ? 
              <Spinner
              className="mx-auto my-3"
              color="primary"
              >
              Loading...
              </Spinner>
              :

              categories?.length === 0 ? 
              <h4 className="my-2">No Categories Found to Display</h4>
              :
              categories?.map((category, index) => {
               return <Col lg={3} md={4} sm={12} style={{cursor:"pointer"}} onClick={()=>handleCategory(category?.id)}>
                <Card 
                    key={index}
                    className="my-2 border-0 category-card"
                    // color="primary"
                    inverse
                    style={{
                      height:"12rem",
                      backgroundColor: index==0 ? "#f3efcc" :
                                       index==1 ? "#dce9f2" :
                                       index==2 ? "#ecdde2" :
                                       index==3 ? "#e3f2d3" :
                                       index==4 ? "#f5e4c8" :
                                       index==5 ? "#e3f2d3" :
                                       index==6 ? "#ece3e4" :
                                       index==7 ? "#fff1d4" :
                                       index==8 ? "#fff1d4" :
                                       index==9 ? "#f3efcc" :
                                       red
                                        
                    }}
                  >
                  {/* <CardHeader style={{fontSize:"10px", letterSpacing:"1px", color:"black"}}>
                    jiffie's item
                  </CardHeader> */}
                  <CardBody className="card-body-hover-effects">
                    <CardTitle tag="h5" className="text-center text-dark mt-4">
                      {category?.title}
                    </CardTitle>
                    <CardText style={{height:"80px", textAlign:"center"}}>
                      {
                        index==0 ? <FaHamburger fontSize={64} color="gray" /> :
                        index==1 ? <GiPopcorn fontSize={64} color="gray" /> :
                        index==2 ? <BsBasket fontSize={64} color="gray" /> :
                        index==3 ? <TbMeat fontSize={64} color="gray" /> :
                        index==4 ? <GiFruitBowl fontSize={64} color="gray" /> :
                        index==5 ? <RiMedicineBottleLine fontSize={64} color="gray" /> :
                        index==6 ? <GiFrozenBlock fontSize={64} color="gray" /> :
                        index==7 ? <CgSmartHomeCooker fontSize={64} color="gray" /> :
                        index==8 ? <GiPopcorn fontSize={64} color="gray" /> :
                        <GiPopcorn fontSize={64} color="gray" />
                      }
                     </CardText>
                  </CardBody>
                </Card>
              </Col>
              })
             }
          </Row>
      </div>
      </Container>
     
      {/* 1st Section */}
      <Container className="p-4" fluid style={{backgroundColor:"#efefef"}}>
        <div className="container bg-light p-1">
          <h3 className="m-4">{singleProduct5?.title}</h3>
          <hr className="mx-4"/>

          <Row>   
            <Carousel breakPoints={breakPoints}>
              {
               productsLoading===true ? 
               <Spinner
               className="m-5"
               color="primary"
               >
               Loading...
               </Spinner>
               :
               singleProduct5?.products!==0 && singleProduct5?.products?.map((product, index)=>{
                 return <Col className="product-card" lg={11} md={11} sm={11} key={index} style={{cursor:"pointer"}} onClick={()=>handleProductDetails(product.id)}>
                    <Card
                          className="my-2 border-0"
                          // color="primary"
                          inverse
                          style={{
                            height:"15rem",
                            backgroundColor:"#f2f2f2"
                          }}
                        >
                        <CardHeader style={{border:"none", backgroundColor:"#f2f2f2"}}>
                          <span className="inline-flex p-1 px-2 rounded" style={{backgroundColor:"#b02e46"}}> {product?.discount}% </span>
                        </CardHeader>
                        <CardBody>
                          <CardTitle tag="h5" className="text-center text-dark">
                          <img src={product?.productImages[0]?.url} className="product-image"/>
                          </CardTitle>
                          <CardText style={{height:"80px", textAlign:"center"}}>
                          </CardText>
                        </CardBody>
                    </Card>
                    <p style={{  whiteSpace: "nowrap", width: "100%",  overflow: "hidden", textOverflow: "ellipsis"}}>{product?.description}</p>
                    <p style={{lineHeight:"1px"}}> <s> ${product.price} </s> <span style={{color:"#be2046", fontWeight:"700", marginLeft:"4%"}}> ${product.price - (product?.discount/100 * product?.price)} </span> </p>
                  </Col>
                })
              }
            </Carousel>
          </Row>
        </div>
      </Container>

      {/* Category Section */}
      <Container className="p-4" fluid style={{backgroundColor:"#efefef"}}>
        <div className="container bg-light p-1">
          <h3 className="m-4">Recent Products</h3>
          <hr className="mx-4"/>

          <Row>   
            <Carousel breakPoints={breakPoints}>
              {
               productsLoading===true ? 
               <Spinner
               className="m-5"
               color="primary"
               >
               Loading...
               </Spinner>
               :
               products!==0 && products?.map((product, index)=>{
                 return <Col className="product-card" lg={11} md={11} sm={11} key={index} style={{cursor:"pointer"}} onClick={()=>handleProductDetails(product.id)}>
                    <Card
                          className="my-2 border-0"
                          // color="primary"
                          inverse
                          style={{
                            height:"15rem",
                            backgroundColor:"#f2f2f2"
                          }}
                        >
                        <CardHeader style={{border:"none", backgroundColor:"#f2f2f2"}}>
                          <span className="inline-flex p-1 px-2 rounded" style={{backgroundColor:"#b02e46"}}> {product?.discount}% </span>
                        </CardHeader>
                        <CardBody>
                          <CardTitle tag="h5" className="text-center text-dark">
                          <img src={product?.productimages?.url} className="product-image"/>
                          </CardTitle>
                          <CardText style={{height:"80px", textAlign:"center"}}>
                          </CardText>
                        </CardBody>
                    </Card>
                    <p style={{  whiteSpace: "nowrap", width: "100%",  overflow: "hidden", textOverflow: "ellipsis"}}>{product?.description}</p>
                    <p style={{lineHeight:"1px"}}> <s> ${product.price} </s> <span style={{color:"#be2046", fontWeight:"700", marginLeft:"4%"}}> ${product.price - (product?.discount/100 * product?.price)} </span> </p>
                  </Col>
                })
              }
            </Carousel>
          </Row>
        </div>
      </Container>
         
      {/* <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {Array.from({ length: 6 }, (_, i) => {
            return <FeatureProduct key={i} />;
          })}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div> */}

    </>
  );
}

export default Landing;

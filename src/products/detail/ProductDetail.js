import Image from "../../nillkin-case-1.jpg";
import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { getSingleProduct, getProductsList, removeProductFromCart, increaseProductQuantity, decreaseProductQuantity } from "../../store/actions";
import { useParams } from "react-router-dom";
import { Col, Card, CardHeader, CardTitle, CardText, CardBody, Row, Button, Spinner } from "reactstrap";
import Carousel from "react-elastic-carousel";
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineClose} from 'react-icons/ai';
import { ImBin} from 'react-icons/im';
import { GrFormClose} from 'react-icons/gr';

const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail() {

  // scroll to the middle of the screen
  window.scroll(100,0);

  const {id} = useParams();
  // console.log("ID:", id)
  useEffect(()=>{
    dispatch(getSingleProduct(id))
    dispatch(getProductsList());
  }, [])

  const navigate = useNavigate();
  const formData = new FormData();
  function changeRating(newRating) {}
  const dispatch = useDispatch();
  const product = useSelector((state)=>state);
  // console.log("All Products:", product)

  const products = product?.adminReducer?.AdminProducts?.rows;

  const singleProduct = useSelector((state)=>state?.adminReducer?.SingleProduct?.details)
  // console.log("single product:", singleProduct)

  const singleProductLoading = product?.adminReducer?.SingleProduct?.Loading;
  // console.log("singleProductLoading:", singleProductLoading);
    
  const categories = product?.adminReducer?.ProductCategory?.categories?.rows;
  // console.log("Categories:", categories)

  const cartProducts = product?.adminReducer?.CartProducts?.productDetail;
  // console.log("cart products:", cartProducts);

  let cartItems = product?.adminReducer?.CartProducts?.items;
  // console.log("Cart Items:", cartItems)

  if (typeof cartItems !== "object"){
    cartItems = JSON.parse(cartItems);
    // console.log("json cart items:", cartItems)
  }

    function handleAddToCart (){
     
    formData.append("categoryId", singleProduct.categoryId)
    formData.append("description", singleProduct.description)
    formData.append("discount", singleProduct.discount)
    formData.append("id", singleProduct.id)
    formData.append("price", singleProduct.price)
    formData.append("productimages", JSON.stringify(singleProduct.productimages))
    formData.append("title", singleProduct.title)
    formData.append("quantity", singleProduct.quantity)

    // console.log("images:", JSON.parse(formData.getAll("productimages")))

    dispatch(addProductToCart(formData))
  }

  const items = { ...localStorage };
  

  // slider
const breakPoints = [
  {width:1, itemsToShow: 1},
  {width:550, itemsToShow: 2},
  {width:768, itemsToShow: 4},
  {width:1200, itemsToShow: 5},
  {width:1600, itemsToShow: 6}
]

const handleProductDetails = (id) => {
  navigate(`/products/${id}`)
  window.location.reload();
}

// image preview
const [indexImage, setIndexImage] = useState(0);
const handleImagePreview = (index) => {
  setIndexImage(index)
  // console.log("index:", indexImage)
}

var images = singleProduct?.productimages;
// console.log("All images:", images)

useEffect(()=>{
  
}, [indexImage])
  

// read more / less
const [isReadMore, setIsReadMore] = useState(true);
const toggleReadMore = () => {
  setIsReadMore(!isReadMore);
};

// cart products increment / decrement

const handleRemoveProduct = (id) => {
  // setAddToCart(0);
  dispatch(removeProductFromCart(id))
  // const deleteOne = cartProducts.length-1;
  // cartProducts.length = deleteOne;
}

const handleQuantityIncrease = (id) => {
  dispatch(increaseProductQuantity(id));
}

const handleQuantityDecrease = (id) => {
  dispatch(decreaseProductQuantity(id))
}

// let disable = false;
//   if(cartItems && cartItems[0]?.quantity===singleProduct?.quantity){
//     disable=true;
//   }
  return (
    <div className="container py-4 px-xl-3">
      <ScrollToTopOnMount/>
        <div className="row mb-4">
          {
            singleProductLoading===true ? 
            <Spinner
            className="mx-auto my-3"
            color="primary"
            >
            Loading...
            </Spinner>
            :
            <>
            <div className="d-none d-lg-block col-lg-1">
            <div className="image-vertical-scroller">
              <div className="d-flex flex-column">
                {
                  singleProduct?.productimages?.map((image, index)=>{
                  return <a key={index}>
                    <img
                      style={{cursor:"pointer"}}
                      className={"rounded mb-2 ratio " + index}
                      alt=""
                      src={image?.url}
                      onClick={()=>handleImagePreview(index)}
                    />
                    </a>
                  })

                }
                {/* {Array.from({ length: 5 }, (_, i) => {
                  let selected = i !== 1 ? "opacity-6" : "";
                  return (
                    <a key={i}>
                      <img
                        className={"rounded mb-2 ratio " + selected}
                        alt=""
                        src={singleProduct?.productimages[2]?.url}
                      />
                    </a>
                  );
                })} */}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12 mb-4">
                <img
                  style={{width:"100%"}}
                  className="border rounded ratio ratio-1x1"
                  alt=""
                  src={singleProduct?.productimages && singleProduct?.productimages[indexImage]?.url}
                />
              </div>
            </div>

            {/* <div className="row mt-2">
              <div className="col-12">
                <div
                  className="d-flex flex-nowrap"
                  style={{ overflowX: "scroll" }}
                >
                  {Array.from({ length: 8 }, (_, i) => {
                    return (
                      <a key={i} href="!#">
                        <img
                          className="cover rounded mb-2 me-2"
                          width="70"
                          height="70"
                          alt=""
                          src={Image}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div> */}
          </div>

          <div className="col-lg-5">
            <div className="d-flex flex-column h-100">
              <h2 className="mb-1">{singleProduct?.title}</h2>
              <h5 className="text-muted mb-4"> <s className="mx-2"> ${singleProduct?.price} </s> <span style={{color:"#be2046", fontWeight:"700"}}> ${singleProduct?.price - (singleProduct?.discount/100 * singleProduct?.price)} </span> </h5>

              <div className="row g-3 mb-3">
                <div className="col">
                {
                      // cartProducts?.length === 0 || cartProducts === null ? 
                      // <h6 className="my-3">No Products Selected</h6>
                      // :
                      cartProducts?.filter((findId)=>{
                        return (findId?.id === id)
                      }).length === 0 || cartProducts ===null ? 
                      <button className="btn btn-outline-dark py-2 w-100" onClick={handleAddToCart}>
                      Add to cart
                      </button>
                      :
                      cartProducts?.
                      // find((array)=>{
                      //   console.log("array:", array, id)
                      //   return (array?.id === id)
                      // })?.
                      map((products, index)=>{
                        console.log("products-------:", products)
                        return     <Row className="mt-1 m-0" style={{display: `${products?.id!==id ? "none" : ""}`}}>
                        {/* <Col lg={3} md={11} xs={12} className="p-0 my-1" style={{backgroundColor:"#EBECF0"}}>
                          <img className="mt-3" src={products?.productimages[0]?.url} style={{width:"100%"}} alt="" />
                        </Col> */}
                        <Col lg={12} md={12} xs={12} className="my-1">
                            <span style={{fontSize:"12px"}}>
                              {/* <p className="m-0 mx-1"> {products?.title} </p> */}
                              {/* <s className="mx-1">{products?.price}</s> <span style={{fontWeight:"bold"}}>  ${products?.price - (products?.discount/100 * products?.price)} </span> <br /> */}
                              <span className="d-flex justify-content-start mt-1"> 
                                <Button className="mx-2 rounded-0" style={{backgroundColor:"#b02e46", border:"0", fontWeight:"800", fontSize:"20px", height:"40px"}} onClick={()=>handleQuantityDecrease(index)}>-</Button>
                                <p style={{fontSize:"24px"}}> {cartItems===null ? 0 : cartItems[index]?.quantity} </p>
                                <Button className="mx-2 rounded-0" size="sm" style={{backgroundColor:"#b02e46", border:"0", fontWeight:"800", fontSize:"20px",  height:"40px"}} onClick={()=>handleQuantityIncrease(index)}>+</Button> 
                                <Button className="mx-2 rounded-0" size="sm" style={{backgroundColor:"#b02e46", border:"0", fontSize:"20px", height:"40px"}} onClick={()=>handleRemoveProduct(index)}>  <ImBin/> </Button>
                                <div className="w-100 d-flex justify-content-end">
                                {/* <GrFormClose className="d-flex justify-right" style={{cursor:"pointer"}} onClick={()=>handleRemoveProduct(index)} /> */}
                                </div>
                              </span>
                              
                            </span>
                        </Col>
                        {/* <Col lg={2} md={3}></Col> */}
                      </Row>
                      })
                    }
                
                
                </div>
                {/* <div className="col">
                  <button className="btn btn-dark py-2 w-100">Buy now</button>
                </div> */}
              </div>

              <h4 className="mb-0">Details</h4>
              <hr />
              <dl className="row">
                <dt className="col-sm-4">Original Price</dt>
                <dd className="col-sm-8 mb-2">{singleProduct?.price}</dd>

                <dt className="col-sm-4">Discount</dt>
                <dd className="col-sm-8 mb-2">{singleProduct?.discount}%</dd>

                <dt className="col-sm-4">Categoty ID</dt>
                <dd className="col-sm-8 mb-2">{singleProduct?.categoryId}</dd>

                {/* <dd className="col-sm-8 mb-1">
                  <Ratings
                    rating={4.5}
                    widgetRatedColors="rgb(253, 204, 13)"
                    changeRating={changeRating}
                    widgetSpacings="2px"
                  >
                    {Array.from({ length: 5 }, (_, i) => {
                      return (
                        <Ratings.Widget
                          key={i}
                          widgetDimension="20px"
                          svgIconViewBox="0 0 19 20"
                          svgIconPath={iconPath}
                          widgetHoverColor="rgb(253, 204, 13)"
                        />
                      );
                    })}
                  </Ratings>
                </dd> */}
              </dl>

              <h4 className="mb-0">Description</h4>
              <hr />
              <p className="lead flex-shrink-0" style={{textAlign:"justify", textJustify:"inner-word"}}>
                <small>
                  {/* {singleProduct?.description} */}
                  {isReadMore ? singleProduct?.description?.slice(0, 30) : singleProduct?.description}
                        {/* {isReadMore ? product?.product?.description?.slice(0, 10) : product?.product?.description} */}
                    <span onClick={toggleReadMore} style={{cursor:"pointer", color:"blue"}} className="read-or-hide">
                    { singleProduct?.description?.length>50 ? isReadMore ? "...read more" : " show less" : ""}
                    </span>
                </small>
              </p>
            </div>
          </div>
            </>
          }
        
        </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          {/* <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <RelatedProduct key={i} percentOff={i % 2 === 0 ? 15 : null} />
              );
            })}
          </div> */}
             <Carousel breakPoints={breakPoints}>
              {
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
                          <span className="inline-flex p-1 px-2 rounded" style={{backgroundColor:"#b02e46"}}> 20kg </span>
                        </CardHeader>
                        <CardBody>
                          <CardTitle tag="h5" className="text-center text-dark">
                          <img src={product?.productimages?.url} className="product-image"/>
                          </CardTitle>
                          <CardText style={{height:"80px", textAlign:"center"}}>
                          </CardText>
                        </CardBody>
                    </Card>
                    <p style={{  whiteSpace: "nowrap", width: "100%",  overflow: "hidden", textOverflow: "ellipsis", textAlign: "justify", textJustify: "inter-word"}}>
                      {product.description}
                    </p>
                    <p style={{lineHeight:"1px"}}> <s> ${product.price} </s> <span style={{color:"#be2046", fontWeight:"700", marginLeft:"4%"}}> ${product.price - product.discount} </span> </p>
                  </Col>
                })
              }
            </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

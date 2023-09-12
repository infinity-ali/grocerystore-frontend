import React from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Accordion,
         AccordionBody,
         AccordionHeader,
         AccordionItem, Spinner } from 'reactstrap'
import { useState } from 'react'
import Fruit from "./Assets/fruit.png"
import "./productFilter.css"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { CiSearch } from 'react-icons/ci';
import { useParams } from 'react-router'
import { getSingleCategory } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { TbMoodSad } from 'react-icons/tb';
import { useNavigate } from 'react-router'
import { getProductsList, getProductCategory, setFilterProducts } from '../store/actions'
import Pagination from './Pagination'
import { DebounceInput } from 'react-debounce-input'
import { AiFillCloseCircle } from 'react-icons/ai';
import queryString from "query-string"
import { useLocation } from 'react-router'

const AllProducts = () => {

  let page = parsed?.page ? parsed?.page : 0;
  const [filter, setFilter] = useState(0);  
  const location = useLocation();
  // console.log("filter:", filter)

  var parsed = queryString.parse(location.search);
  // console.log("parsed:", parsed)

   // User is currently on this page
   const [currentPage, setCurrentPage] = useState(0);
  //  console.log("current page:", currentPage)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState("");
  const [value, setValue] = useState([1, 5000]);
  const [productFilter, setProductFilter] = useState(
    {
      category_id: 0,
      limit: 10,
      page: currentPage,
      price: {
          upperLimit:2000,
          lowerLimit:1
      },
      title: filterData
      }
  )

  useEffect(()=>{
    dispatch(getProductsList());
    dispatch(setFilterProducts(productFilter));
    dispatch(getProductCategory())
  }, [])

  useEffect(()=>{
    // console.log("filter---:", filterData)
    setProductFilter({
      ...productFilter,
      title: filterData,
      page: currentPage-1,
    })
  }, [filterData, currentPage])

  useEffect(()=>{
    dispatch(setFilterProducts(productFilter));
  }, [productFilter])

    const response = useSelector((state)=>state)
    // console.log("All Response:", response)

    const totalProducts = response?.adminReducer?.FilterProducts?.filterProducts?.count;
    // console.log("total products:", totalProducts);

    const productsLoading = response?.adminReducer?.AdminProducts?.loading;
    // console.log("products-Loading:", productsLoading)

    const cartProducts = response?.adminReducer?.CartProducts?.productDetail;

    const categoryProducts = response?.adminReducer?.SingleProductCategory?.singleCategory?.products;
    // console.log("Category:", categoryProducts)

    const products = response?.adminReducer?.AdminProducts?.rows;
    // console.log("Products:", products)

    const categories = response?.adminReducer?.ProductCategory?.categories?.rows;
    // console.log("Categories:", categories)

    const filteredProducts = response?.adminReducer?.FilterProducts?.filterProducts?.rows;
    // console.log("filter by Products:", filteredProducts)

    const filteredBySearch = response?.adminReducer?.FilterBySearch?.filterBySearch?.rows;
    // console.log("filter by Search:", filteredBySearch)

    // const {id} = useParams();
    var id;
    const [open, setOpen] = useState('');
    const toggle = (id) => {
      if (open === id) {
        setOpen();
      } else {
        setOpen(id);
      }
    };
 
    // filter by price
    let checkId;
    const handleChange = (event, newValue) => {
      // console.log("event type-------------",event.target.value)

      if(newValue[1]>newValue[0] && newValue[0]<newValue[1]){
        clearTimeout(checkId);
        checkId = setTimeout(function(){
          console.log("new value:", newValue)
          setValue(newValue);
        }, 1000)
      }
      else{
        alert("Prices Overlapping")
        let smaller = newValue[0];
        let larger = newValue[1];

        console.log("smaller:", smaller, "larger:", larger)

        setValue([ 
          larger-10, larger   
        ])
      }
    }

    useEffect(()=>{
      setProductFilter({
        ...productFilter,
        price: {
          upperLimit:value[1],
          lowerLimit:value[0]
        },
        })
    }, [value])

    // filter by Search
    let checkSearch;
    const handleSearch = (e) => {

      clearTimeout(checkId);
      checkSearch = setTimeout(function(){
        setFilterData(e.target.value);
      }, 1000)
    }

  var allProducts = false;
    // filter by category
    const handleFilter = (id)=> {
      allProducts = true;
      setProductFilter({
        ...productFilter,
        category_id: id
      })
    }
    
    // const categoryFake = ["Grocery", "Bakery and Diary", "Frozen Food", "Beverages & snacks", "Personal Care", "Fresh Meat"]

    const handleProductDetails = (id) => {
      id = id;
      // window.history.replaceState(null, "New Page Title", `/`)
      navigate(`/products/${id}`)
    }

    // pagination
   
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(10);

    // indices of page
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // console.log("indexOfFirstRecord:", indexOfFirstRecord);
    // console.log("indexOfLastRecord:", indexOfLastRecord)
    // if(filteredByRange===undefined)
    // return(
    //   <>
    //       <h3>Loading</h3>
    //   </>
    // )

    // Records to be displayed on the current page
    let nPages = 0, paginatedProducts = [];

    if(filteredProducts!==undefined){
      // console.log("if ran")
      paginatedProducts = filteredProducts;
      // console.log("paginatedProducts:", paginatedProducts)
      nPages = Math.ceil(totalProducts / recordsPerPage)
      // console.log("paginatedOrders:", paginatedProducts)
      // console.log("nPages", nPages)
    }
    else{
      // console.log("hi")
    }

  return (
    <>
        <Container fluid>
            <Row>
                <Col lg={3} sm={12} className="p-4">
                    
                <div style={{marginLeft:"22px"}}>
                    <span className='d-flex'>
                        {/* <TextField id="search-product" className='mb-4 w-100' onChange={(e)=>handleSearch(e)} label="Search" variant="standard" /> */}
                        {/* <DebounceInput
                        minLength={2}
                        className="search px-3 py-1 w-100"
                        placeholder="Enter something here..."
                        debounceTimeout={500}
                        style={{border:0, height:"30px", marginTop:"5%",borderRadius:"6px", boxShadow:"1px 1px 1px 1px gray"}}
                        onChange={(e) => handleSearch(e)}
                        /> */}
                        {/* <CiSearch className='mt-4 mx-2' fontSize={20}/> */}
                    </span>
                    <input type="text" className="search px-3 py-1 w-100" onChange={(e) => handleSearch(e)}
                      placeholder="Enter something here..."
                      style={{border:0, height:"30px", marginTop:"5%",borderRadius:"6px", boxShadow:"1px 1px 1px 1px gray"}}
                      />

                     <h6 className='my-3'>Filter by Price</h6>
                </div>

                <Box className="mt-3 mx-3">
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        // value={value}
                        onChange={handleChange}
                        // minRange = {1}
                        // valueLabelDisplay="auto"
                        valueLabelDisplay="on"
                        defaultValue={value}
                        min={1}
                        max={1000}
                        // color="danger"
                        // getAriaValueText={valuetext}
                    />
                </Box>
                
                <Accordion flush open={open} toggle={toggle}>
                    <AccordionItem>
                    <AccordionHeader targetId="1" style={{backgroundColor:"#f9f9fb"}}> <h6> Filter by Category </h6> </AccordionHeader>
                    <AccordionBody accordionId="1"  style={{backgroundColor:"#f9f9fb"}}>
                    {/* <p onClick={()=>handleFilter(0)} style={{fontSize:"16px", cursor: "pointer"}}> All Products </p> */}
                      {
                        categories?.length>0 ? categories?.map((cats, index)=>{
                           return <span className='d-flex justify-content-between'
                            key={index}>
                              <p className={paginatedProducts[0]?.categoryId===cats?.id && paginatedProducts?.length<10
                               ? "text-success font-weight-bold" : "text-dark"}
                               onClick={()=>handleFilter(cats?.id)}
                               style={{fontWeight:"400", cursor: "pointer"}}
                               >
                                {cats?.title}
                              </p>

                              {paginatedProducts[0]?.categoryId===cats?.id && paginatedProducts?.length<10
                              ? 
                              <AiFillCloseCircle style={{cursor:"pointer"}} className='mt-1' fontSize={20} onClick={()=>handleFilter(0)}/>
                              : 
                              ""} 
                            </span>
                            
                        })
                        :
                        "No Categories Available"
                      }
                    </AccordionBody>
                    </AccordionItem>

                </Accordion>
                </Col>
                <Col lg={9} sm={12} className="p-4">
                    <Row>
                        {
                            productsLoading===true
                            ?
                            <Spinner
                            className="mx-auto my-3"
                            color="primary"
                            >
                            Loading...
                            </Spinner>
                            :
                            filteredProducts?.length===0 || filteredProducts=== undefined || filteredProducts === 0 ?
                            <h5 className='mt-4'> Oops! <TbMoodSad fontSize={32}/> <br /> No Products Found in this Category</h5>
                            :
                            paginatedProducts?.map((singleCat, index)=>{
                               return <Col lg={4} sm={12} style={{cursor:"pointer"}}  onClick={()=>handleProductDetails(singleCat?.id)}>
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
                                  <span className="inline-flex p-1 px-2 rounded" style={{backgroundColor:"#b02e46"}}>
                                     {singleCat?.discount}% </span>
                                </CardHeader>
                                <CardBody>
                                  <CardTitle tag="h5" className="text-center text-dark">
                                  <img src={singleCat?.productImages[0]?.url} style={{ width: "100%", height: "160px", objectFit: "contain"}}
                                   className="product-image"/>
                                  </CardTitle>
                                  <CardText style={{height:"80px", textAlign:"center"}}>
                                  </CardText>
                                </CardBody>
                                </Card>
                                <p style={{fontWeight:"600", whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipses", width:"80%"}}>{singleCat?.title}</p>
                                {/* <p style={{fontWeight:"600", whiteSpace:"nowrap",overflow:"hidden", textOverflow:"ellipses", width:"80%"}}>{singleCat?.description}</p> */}
                                <p style={{lineHeight:"1px", color:"gray"}}> <s> {singleCat?.price} </s>
                                 <span style={{color:"#be2046", fontWeight:"700", marginLeft:"4%"}}>
                                 {singleCat?.price - (singleCat?.discount/100 * singleCat?.price) } </span> </p>
                                </Col>
                            })
                        }
                    </Row>

                    {
                        filteredProducts === null || filteredProducts?.length===0 ? "" :   
                        <Pagination
                        nPages = { nPages }
                        currentPage = { currentPage } 
                        setCurrentPage = { setCurrentPage }
                      />
                    }   
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default AllProducts
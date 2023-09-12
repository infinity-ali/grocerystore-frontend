import React from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Button } from "reactstrap";
import CartBannerFruit from "./Assets/cartfruits.png";

const Banner = () => {
  const {userId} = useParams;
  const queryString = window.location.href;
  // console.log("query string:", queryString);

let stringUrl = queryString;
let checkout = "checkout";
let cart = "cart";
var bannerHeading = "";

if (stringUrl.includes(checkout)) {
	// console.log(checkout);
  bannerHeading = checkout;
} else if(stringUrl.includes(cart)) {
	// console.log(cart);
  bannerHeading = cart;
} else{
  // console.log("nothing")
}

  const myArray = queryString.split(" ", 5);
  // console.log("myArray:", myArray);

  const urlParams = new URLSearchParams(queryString);
  // console.log("urlParams.values():", urlParams.values())

  return (
    <>
      <Container fluid style={{ backgroundImage: "linear-gradient(to right, #FFFFFF, #faecc7)"}}>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12} className="align-self-center">
            <h4
              style={{
                marginLeft: "15%",
                fontSize: "42px",
                fontWeight: "bold",
                color: "#b02e46",
              }}
            >
              {bannerHeading.toUpperCase()}
            </h4>
            <a
              href=""
              style={{
                marginLeft: "15%",
                textDecoration: "none",
                color: "gray",
              }}
            >
              Home
            </a>{" "}
            /{" "}
            <a style={{ textDecoration: "none", color: "gray", cursor:"pointer" }}>
              {bannerHeading}
            </a>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12} className="my-3">
            <img src={CartBannerFruit} width="75%" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Banner;

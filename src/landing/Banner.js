import BannerZero from "./newBanner-0.jpg";
import BannerOne from "./newBanner-1.jpg";
import BannerTwo from "./newBanner-2.jpg";
import { Container, Row, Col, Button } from "reactstrap";
import BannerImage from "./Assets/fruits-banner.png"
import "./banner.css"
import { useNavigate } from "react-router";
// function BannerIncidator(props) {
//   return (
//     <button
//       type="button"
//       data-bs-target="#bannerIndicators"
//       data-bs-slide-to={props.index}
//       className={props.active ? "active" : ""}
//       aria-current={props.active}
//     />
//   );
// }

// function BannerImage(props) {
//   return (
//     <div
//       className={"carousel-item " + (props.active ? "active" : "")}
//       data-bs-interval="4000"
//     >
//       <div
//         className="ratio"
//         style={{ "--bs-aspect-ratio": "50%", maxHeight: "480px" }}
//       >
//         <img
//           className="d-block w-100 h-100 bg-dark cover"
//           alt=""
//           src={props.image}
//         />
//       </div>
//       <div className="carousel-caption d-none d-lg-block">
//         {/* <h5>Banner Header</h5>
//         <p>Some representative placeholder content for the banner.</p> */}
//       </div>
//     </div>
//   );
// }

function Banner() {
  const history = useNavigate();
  return (
    <>
        <Container fluid style={{ backgroundImage: "linear-gradient(to right, #FFFFFF, #faecc7)"}}>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12} className="align-self-center mt-5">
                <h4 style={{marginLeft:"10%", fontSize:"62px", color:"#b02e46"}}>Grocery Store</h4>
                <p style={{marginLeft:"10%", fontSize:"20px", fontStyle:"italic"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <Button className="banner-button" outline onClick={()=>history("/all-products")}  style={{marginLeft:"10%", borderColor:"#b02e46", fontWeight:"500"}}>Shop Now</Button>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12} className="my-3">
              <img src={BannerImage} width="100%" />
              </Col>
            </Row>
        </Container>
    </>
    // <div
    //   id="bannerIndicators"
    //   className="carousel slide"
    //   data-bs-ride="carousel"
    //   style={{ marginTop: "56px" }}
    // >
    //   <div className="carousel-indicators">
    //     <BannerIncidator index="0" active={true} />
    //     <BannerIncidator index="1" />
    //     <BannerIncidator index="2" />
    //   </div>
    //   <div className="carousel-inner">
    //     <BannerImage image={BannerZero} active={true} />
    //     <BannerImage image={BannerOne} />
    //     <BannerImage image={BannerTwo} />
    //   </div>
    // </div>
  );
}

export default Banner;

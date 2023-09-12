import { Row, Col, Container } from "reactstrap";
import { FaFacebookF } from 'react-icons/fa';
import {GrInstagram} from 'react-icons/gr'
import {HiOutlineMail} from 'react-icons/hi'
import {RiWhatsappLine} from "react-icons/ri"
import {AiOutlineCopyrightCircle} from "react-icons/ai"
import GoogleButton from "./Assets/applegoogleboth.png"

function Footer() {
  return (
    <footer className="mt-auto">
      <Row className="d-flex justify-content-center mx-4">
        <Col lg={2} md={4} sm={6} xs={12}>
          <h6 className="my-3" style={{color:"black", fontWeight:"600", fontFamily:"sans-serif"}}>Company</h6>
          <p style={{color:"grey", lineHeight:"16px", fontSize:"14px"}}>About</p>
          <p style={{color:"grey", lineHeight:"16px", fontSize:"14px"}}>Location</p>
          <p style={{color:"grey", lineHeight:"16px", fontSize:"14px"}}>Reviews & Ratings</p>
        </Col>
        <Col lg={2} md={4} sm={6} xs={12}>
        <h6 className="my-3" style={{color:"black", fontWeight:"600", fontFamily:"sans-serif"}}>Follow us on</h6>

        <span className="flex d-flex">
           <FaFacebookF color="gray"/> <p style={{color:"grey", lineHeight:"16px", fontSize:"14px", marginLeft:"3%"}}> Facebook</p>
        </span>

        <span className="flex d-flex">
          <GrInstagram color="gray"/> <p style={{color:"grey", lineHeight:"16px", fontSize:"14px", marginLeft:"3%"}}> Instagram</p>
        </span>
       
        </Col>

        <Col lg={2} md={4} sm={6} xs={12}>
        <h6 className="my-3" style={{color:"black", fontWeight:"600", fontFamily:"sans-serif"}}>Contact Us</h6>

        <span className="flex d-flex">
          <HiOutlineMail color="gray"/> <p style={{color:"grey", lineHeight:"16px", fontSize:"14px", marginLeft:"3%"}}> jiffys.co@gmail.com</p>
        </span>

        <span className="flex d-flex">
          <RiWhatsappLine color="gray"/> <p style={{color:"grey", lineHeight:"16px", fontSize:"14px", marginLeft:"3%"}}> +92-302942849483</p>
        </span>

        </Col>

        <Col lg={2} md={4} sm={6} xs={12}>
        <h6 className="my-3" style={{color:"black", fontWeight:"600", fontFamily:"sans-serif"}}>Useful Links</h6>

        <span className="flex d-flex">
         <p style={{color:"grey", lineHeight:"16px", fontSize:"14px", marginLeft:"3%"}}> Privacy Policy</p>
        </span>

        <span className="flex d-flex">
         <p style={{color:"grey", lineHeight:"16px", fontSize:"14px", marginLeft:"3%"}}> Terms & Conditions</p>
        </span>

        <span className="flex d-flex">
         <p style={{color:"grey", lineHeight:"16px", fontSize:"14px", marginLeft:"3%"}}> FAQs</p>
        </span>

        </Col>

        <Col lg={3} md={4} sm={6} xs={12}>
          <h6 className="mt-3" style={{color:"black", fontWeight:"600", fontFamily:"sans-serif"}}>Download the app</h6>
          <img src={GoogleButton} style={{width:"108%", marginTop:"-14px", marginLeft:"-8px"}} alt=""/> 
          <p style={{color:"grey", lineHeight:"16px", fontSize:"14px"}}>Developed by <a href="#" style={{fontWeight:"600"}} className="text-danger"> Infinitybits</a></p>
        </Col>
      </Row>

      <Container fluid className="text-light text-center fw-normal fst-normal py-1" style={{backgroundColor:"#b02e46"}}>
          <AiOutlineCopyrightCircle fontSize={16}/> <span style={{fontSize:"14px"}}> Jiffys's Pakistan </span>
      </Container>
    </footer>
  );
}

export default Footer;

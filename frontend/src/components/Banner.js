import { Container, Col, Row, Button, Image } from 'react-bootstrap';
import Landing from './Landing';



function Banner() {
    return ( 
        <>
        <Container fluid style={{"backgroundColor":"#000"}}>
            <Row className="justify-content-md-center">
                <Col md={6} lg={6}>
                <Image src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </Col>
                <Col md={6} lg={6} style={{
                    "margin":"0",
                    top:"50%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Row>
                    <h1 style={{color:"#ffff"}}>Decentralised Music Store <br /> Buy the Best Music Equipments using ETC <br /> 
                    <Button variant='dark' style={{backgroundColor:"#d87d4a"}}>See Products</Button>
                    </h1>
                    </Row>
                </Col>
            </Row>
        </Container>
        <Landing />
        </>
     );
}

export default Banner;
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import thumbnail1 from '../assets/earphones.png';
import thumbnail2 from '../assets/headphones.png'
import thumbnail3 from '../assets/speakers.png'
import { useNavigate } from "react-router-dom";


function Landing() {


    let navigate = useNavigate(); 
    const routeChange1 = () =>{ 
      let path = `/headphones`; 
      navigate(path);
    }

    const routeChange2 = () =>{ 
        let path = `/earphones`; 
        navigate(path);
      }

      const routeChange3 = () =>{ 
        let path = `/speakers`; 
        navigate(path);
      }

  return (
    <>
      <Container>

        <Row>
        <Col style={{padding:"30px"}}>
        <Card style={{ width: '18rem', height:"24rem" }}>
      <Card.Img variant="top" src={thumbnail1} />
      <Card.Body>
        <Card.Title style={{textAlign:"center"}}>EARPHONES</Card.Title>
      
        <Button variant="link" style={{margin:"0 auto" , display:"grid", color:"#d87d4a"}} onClick={routeChange2}>Shop</Button>
      </Card.Body>
    </Card>
        </Col>

        <Col style={{padding:"30px"}}>
        <Card style={{ width: '18rem', height:"24rem" }}>
      <Card.Img variant="top" style={{objectFit:"cover"}} src={thumbnail2} />
      <Card.Body>
        <Card.Title style={{textAlign:"center"}}>HEADPHONES</Card.Title>
      
        <Button variant="link" style={{margin:"0 auto" , display:"grid", color:"#d87d4a"}} onClick={routeChange1}>Shop </Button>
      </Card.Body>
    </Card>
        </Col>

        <Col style={{padding:"30px"}}>
        <Card style={{ width: '18rem', height:"24rem" }}>
      <Card.Img variant="top" style={{objectFit:"fill"}} src={thumbnail3} />
      <Card.Body>
        <Card.Title style={{textAlign:"center"}}>SPEAKERS</Card.Title>
        <Button variant="link" style={{margin:"0 auto" , display:"grid", color:"#d87d4a"}} onClick={routeChange3}>Shop</Button>
      </Card.Body>
    </Card>
        </Col>
        </Row>

      </Container>

    </>
  );
}

export default Landing;

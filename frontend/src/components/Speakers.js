import { Container, Row, Col, Card, Button, Spinner,Alert } from 'react-bootstrap';
import Sounds from "../Utils/Speakers.json";
import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';

function Speakers({state}) {
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { contract } = state; 

    const buy = async (id) => {
        handleClose()
        setIsLoading(true);
         const index = id - 1; 
        const amount = {value:ethers.utils.parseEther(Sounds[index].price)}
        console.log(Sounds[index].name);
        console.log(index); 
       
        const transaction = await contract.placeOrder(
            Sounds[index].name,
            Sounds[index].category,
            Sounds[index].imageURL,
            Sounds[index].description,
            Sounds[index].price,
            amount
            );
            await transaction.wait();
            console.log("Completed")
            setShowAlert(true);
            setIsLoading(false);

    }

    return ( 
        <>
        <Container style={{marginTop:"50px"}}>
        <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible>Transaction is successful</Alert>
            {Sounds.map((product) => {
                return (
                    <Row key={product.id} style={{marginTop:"20px"}}>
                    <Col style={{
                        "margin":"0",
                        top:"50%",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                    <Card style={{ width: '35rem' }}>
                     <Card.Img 
                     variant="top" 
                     style={{objectFit:"cover"}}
                     src={product.imageURL} />
                 </Card>
                    </Col>
                    <Col style={{
                        "margin":"0",
                        top:"50%",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                    
                    <span> 
                    <h2 style={{marginBottom:"15px"}}>{product.name}</h2>
                    {product.description}
                    <br />
                    {isLoading ? <Spinner animation="border" variant="warning" style={{marginTop:"20px"}}/> :
                    <Button variant='light' size="lg" style={{background:"#d87d4a", marginTop:"20px", color:"#fff"}} onClick={() => buy(product.id)}> {product.price} ETH</Button>
                }
                    </span>
                    </Col>
                </Row>
                )
            })}
           
        </Container>
        </>
     );
}

export default Speakers;
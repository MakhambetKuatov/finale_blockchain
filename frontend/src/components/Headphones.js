import { Container, Row, Col, Card, Button,Spinner,Alert } from 'react-bootstrap';
import Product1 from "../Utils/Headphones.json";
import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';


function Headphones({state}) {
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
        const amount = {value:ethers.utils.parseEther(Product1[index].price)}
        console.log(Product1[index].name);
        console.log(index); 
       
        const transaction = await contract.placeOrder(
            Product1[index].name,
            Product1[index].category,
            Product1[index].imageURL,
            Product1[index].description,
            Product1[index].price,
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
            {Product1.map((product) => {
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

export default Headphones;
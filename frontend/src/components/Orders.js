import { React, useState, useEffect } from 'react';
import { Container, Col, Row, Card, Table, Button, ListGroup } from 'react-bootstrap';
import Banner from './Banner';
import { ethers } from 'ethers';


function Orders({state, details}) {
    const [orders, setOrders] = useState([]);
    const { contract } = state;
    const address = details.accounts;
    

    useEffect(() =>{
        const orderList = async () =>{
            const orders = await contract.showOrders();
            setOrders(orders);
            
        };
        contract && orderList();
    },[contract]);


   




//  useEffect(() =>{
//  const withDraw = async () =>{
//      const see = await contract.withdrawMoney(ethers.utils.parseEther("0.001"));        
//      console.log(see);
    
//  };
//  contract && withDraw();
//  },[contract]);


    return ( 
        <>
        <Banner />
        <Container>
            <Row>
                <Col></Col>
                <Col md="auto">
                <h2>Order History</h2>
                </Col>
                <Col></Col>

                 <Row style={{padding:"20px"}}>
       <Card>
      <Card.Header>Order History</Card.Header>
      <Card.Body>
      <Table striped bordered hover>
      <thead>
        <tr>
          
          <th> Product Name</th>
          <th>Category</th>
          <th>Order Placed At</th>
          <th>Price</th>
        </tr>
      </thead>
      {orders.map((order) => {
        return(
          String(order.from).toLowerCase() == address ? 
            <tbody key={order.timestamp}>
            <tr>
              <td>{order.name}</td>
              <td>{order.category}</td>
              <td>{new Date(order.timestamp * 1000).toLocaleString()}</td>
              <td>{order.price} ETH</td>
            </tr>
          </tbody>  
          :
          <></>
        );
      })}
     
    </Table>
      </Card.Body>
    </Card>
       </Row> 
                
            </Row>
        </Container>
        </>
     );
}

export default Orders;
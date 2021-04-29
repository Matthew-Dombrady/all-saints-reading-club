import React from 'react';
import '../styles.css'; 
import Book from './Book'



import {Container, Row, ProgressBar, Card, Button} from 'react-bootstrap';

const MainPage=() => {

    return (

        <Container>
            <Row className='row-1'>
                <Card>
                    <Card.Title className='title'>My Progess</Card.Title>
                </Card>
            </Row>
            <Row className='row-1'>
                <Container>
                    <ProgressBar striped variant="success" now={40} />
                </Container>
            </Row>
            <Row className='row-1'>
                <Button className='add-book' variant="success">I READ <br /> A BOOK!</Button>
            </Row>
            <Row className='row-1'>
                <Card>
                    <Card.Title className='title'>Books I've Read</Card.Title>
                </Card>
            </Row>
            <Row>
                <Book author='jk rowling' title='harry potter' genre='fantasy' pages='500' />
            </Row>
        </Container>
    )
};
export default MainPage;

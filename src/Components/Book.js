import React from 'react';
import '../styles.css'; 
import bookIcon from '../Assets/book.svg'
import person from '../Assets/person.svg'
import pages from '../Assets/pages.svg'

import {Card, Container, Row, Col} from 'react-bootstrap';

const Book=(props) => {

    return (
        <Card className='book-card'> 
            <Container>
                <Row>
                    <Col className='icon-col'>
                        <Row className='book-row'><img className='book-icon' src={bookIcon} alt='book-icon' /></Row>
                        <Row className='book-row'><img className='book-icon' src={person} alt='person-icon' /></Row>
                        <Row className='book-row'><img className='book-icon' src={pages} alt='pages-icon' /></Row>
                    </Col>

                    <Col className='book-col'>
                        <Row className='book-row' className='book-text'><text>{props.title}</text></Row>
                        <Row className='book-row' className='book-text'>{props.author}</Row>
                        <Row className='book-row' className='book-text'>{props.pages}</Row>
                    </Col>
                </Row>

            </Container>
        </Card>
    )
};
export default Book;

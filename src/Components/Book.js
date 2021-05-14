import React from 'react';
import '../styles.css'; 
import bookIcon from '../Assets/book.svg'
import person from '../Assets/person.svg'
import pages from '../Assets/pages.svg'
import genre from '../Assets/genre.svg'

import {Card, Container, Row, Col} from 'react-bootstrap';

const Book=(props) => {

    return (
        <Card className='book-card'> 
            <Container>
                <Row>
                    <Col>
                        <Row className='book-row'><img className='book-icon' src={bookIcon} alt='book-icon' /></Row>
                        <Row className='book-row'><img className='book-icon' src={person} alt='person-icon' /></Row>
                        <Row className='book-row'><img className='book-icon' src={pages} alt='pages-icon' /></Row>
                        <Row className='book-row'><img className='book-icon' src={genre} alt='genre-icon' /></Row>
                    </Col>

                    <Col className='book-col'>
                        <Row className='book-row' className='book-text'><text>{props.title}</text></Row>
                        <Row className='book-row' className='book-text'>{props.author}</Row>
                        <Row className='book-row' className='book-text'>{props.pages}</Row>
                        <Row className='book-row' className='book-text'>{props.genre}</Row>
                    </Col>
                </Row>

            </Container>
        </Card>
    )
};
export default Book;

import React from 'react';
import '../styles.css'; 
import bookIcon from '../Assets/book.svg'
import person from '../Assets/person.svg'
import pages from '../Assets/pages.svg'
import genre from '../Assets/genre.svg'

import {Card} from 'react-bootstrap';

const Book=(props) => {

    return (
        <Card>
            
            <Card.Title>
                <img src={bookIcon} alt='book-icon' />
                {props.title}
            </Card.Title>

            <Card.Subtitle>
                <img src={person} alt='person-icon' />
                {props.author}
            </Card.Subtitle>
            <Card.Text>
                <img src={genre} alt='genre-icon' />
                {props.genre}
            </Card.Text>
            <Card.Text>
                <img src={pages} alt='pages-icon' />
                {props.pages}
            </Card.Text>
        </Card>
    )
};
export default Book;

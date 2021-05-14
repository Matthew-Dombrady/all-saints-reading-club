import React, { useState } from 'react';
import '../styles.css'; 
import Book from './Book'
import Navbar from './Navbar';

import {Container, Row, Col, ProgressBar, Card, Button} from 'react-bootstrap';

import { firebaseApp } from '../firebase'
import "firebase/auth";
import { getStudent } from '../fetch';
import { user } from 'firebase-functions/lib/providers/auth';

const MainPage=() => {

    const [name, setName] = useState('');
    const [grade, setGrade] = useState(0);
    const [booksRead, setBooksRead] = useState(0);
    const [prizeName, setPrizeName] = useState('');
    const [prizeTarget, setPrizeTarget] = useState(0);
    const [books, setBooks] = useState([]);



    const [lastBookTitle, setLastBookTitle] = useState('');
    const [lastBookAuthor, setLastBookAuthor] = useState('');
    const [lastBookPages, setLastBookPages] = useState('');
    const [lastBookGenre, setLastBookGenre] = useState('');



    firebaseApp.auth().onAuthStateChanged(function(user) {
        if (user) {

            console.log("Getting student");
            // Fetch books
            fetch('http://localhost:5000/all-saints-reading-club/us-central1/student-getStudent?uid=' + user.uid)
            .then(response => response.json())
            .then(student => gotStudent(student))
            .catch((error) => {
                console.error('Error:', error.message);
            });


        } else {
            console.log("Not logged in");
        }
    });
    
    function gotStudent(s) {
        setName(s.firstName);
        setGrade(s.grade);
        setBooksRead(s.books_read);
        setBooks(s.books);

        fetch('http://localhost:5000/all-saints-reading-club/us-central1/student-getPrize?id=' + s.next_prize)
        .then(response => response.json())
        .then(prize => gotPrize(prize))
        .catch((error) => {
            console.error('Error:', error.message);
        });

        
        fetch('http://localhost:5000/all-saints-reading-club/us-central1/student-getBook?id=' + s.last_book)
        .then(response => response.json())
        .then(book => gotBook(book))
        .catch((error) => {
            console.error('Error:', error.message);
        });


    }

    function gotBook(b) {
        setLastBookTitle(b.Title);
        setLastBookAuthor(b.Author);
        setLastBookPages(b.Pages);
        setLastBookGenre(b.Genre);
    }

    function gotPrize(p) {
        setPrizeName(p.name);

        if (grade < 2) {
            setPrizeTarget(p.target1);
        }

        else if (grade > 2) {
            setPrizeTarget(p.target2);
        }
    }

    function getProgress() {
        var read = booksRead;
        var target = prizeTarget;
        var progress = read/target;
        return progress*100;
    }

    function displayBooks() {
        const bookList = books.map((book) => {
            <Col>{book}</Col>
        })

        return bookList;
    }


          
    return (

        <div className='content'>
            <Navbar name={name} />
            <Container>
                <Row className='row-1'>
                    <Card className='main-card'>
                        <Card.Title className='title'>My Progess</Card.Title>
                    </Card>
                </Row>
                <Row className='row-1'>
                    <Container>
                        <ProgressBar striped variant="success" now={getProgress()} />
                        <text>Next Prize: {prizeName}</text>
                    </Container>
                </Row>
                <Row className='row-1'>
                    <Button className='add-book' variant="success" >I READ <br /> A BOOK!</Button>
                </Row>
                <Row className='row-1'>
                    <Card className='main-card'>
                        <Card.Title className='title'>Books You've Read</Card.Title>
                    </Card>
                </Row>
                <Row>
                    {displayBooks()}
                </Row>
            </Container>
        </div>
    )
};
export default MainPage;

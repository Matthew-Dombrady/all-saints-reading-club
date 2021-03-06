import React, { useEffect, useState } from 'react';
import '../styles.css'; 
import Book from './Book'
import Navbar from './Navbar';
import BookForm from './BookForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";  

import {Container, Row, Col, ProgressBar, Card, Button, OverlayTrigger, Popover} from 'react-bootstrap';

import { firebaseApp } from '../firebase'
import "firebase/auth";
import { getStudent } from '../fetch';
import { user } from 'firebase-functions/lib/providers/auth';

import logo from '../Assets/school_logo.png';
import gift from '../Assets/gift.png';
import vacation from '../Assets/vacation.png'
import { _refWithOptions } from 'firebase-functions/lib/providers/database';

const MainPage=(props) => {

    const books = props.books;
    const prizeTarget = props.prizeTarget;
    const grade = props.grade;
    const prizes = props.prizes;
    const prizeName = props.prizeName;
    const name = props.name;
    const last = props.last;
    const uid = props.uid;

    const [disp1, setDisp1] = useState("");
    const [disp2, setDisp2] = useState("");


    const [visible, setVisible] = useState(false);

    const reload = props;


    useEffect(() => {

        console.log("Props", props);

        if (reload == true) {
            window.location.reload();
        }

        if (uid != "") {
            setDisp1("content");
            setDisp2("content-hide");
        }

        else {
            setDisp1("content-hide");
            setDisp2("content");
        }

        
        if (books.length >= prizeTarget && books.length != 0 && prizeTarget != 0) {
    
          var newPrize = "";
            
          if (grade < 2) {
    
            switch (prizeName) {
              case "Special Bookmark/Pencil":
                newPrize = "Frosty";
                break;
              case "Frosty from Wendy's":
                newPrize = "Book";
                break;
              case "Colouring book":
                newPrize = "Bag";
                break;
              case "All Saints Draw String Bag":
                newPrize = "Hat";
                break;      
              default:
                newPrize = "Pencil";
                break;
            }
    
          }
    
          else {
    
            switch (prizeName) {
              case "Frosty from Wendy's":
                newPrize = "Bag";
                break;
              case "All Saints Draw String Bag":
                newPrize = "Hat";
                break;
              default:
                newPrize = "Frosty";
                break;
            }
    
          }
    
    
            console.log("New prize:", newPrize);

            // Fetch student
            fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/student-changePrize?userid=' + uid + '&prize=' + newPrize)
            .then(response => console.log(response))
            .catch((error) => {
                console.error('Error:', error.message);
            });

    
        }

        if ((props.grade <= 2 && props.books.length == 60) || ((props.grade == 3 || props.grade == 4) && props.books.length == 20) || (props.grade >= 5 && props.books.length == 15)) {
            console.log("SEND EMAIL");
            window.emailjs.send(
                'service_jir009y', 'template_5ji0ofa',
                {
                    student_name: name + " "  + last,
                    message: name + " "  + last + " in grade " + grade + " has read " + books.length + " books and earned every prize!"
                }

                ).then(res => {
                  console.log('Email successfully sent!')
                })
                // Handle errors here however you like, or use a React error boundary
                .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
          
        }
    
    
    }, 
    [props]
    );


    function displayBooks() {

        if (books.length > 0) {

            const bookList = books.map((b) =>
                <Book title={b.title} author={b.author} pages={b.pages} />
            );

            return bookList;
        }

        else {
            return <text style={{marginTop:'10px'}}>No books yet!</text>;
        }

    }

    function getProgress() {
        return (books.length/prizeTarget)*100;
    }

    function getProgressText(p) {
        if (p > 1) {
            return p + " books to go!";
        }

        else if (p == 1) {
            return p + " book to go!";
        }

        else {
            return "You got it!"
        }
    }

    function getBars() {

        var userPrizes = [];

        prizes.forEach(p => {

            if (grade <= 2) {
                userPrizes.push({name: p.name, target: p.target1});
            }

            else if (grade == 3 || grade == 4 ) {
                userPrizes.push({name: p.name, target: p.target2});
            }

            else if (grade >= 5) {
                console.log("TARGET:", p);
                userPrizes.push({name: p.name, target: p.target3});
            }

            for (let i = 0; i < userPrizes.length; i++) {
                for (let j = 0; j < userPrizes.length; j++) {
                    
                    if (userPrizes[i].target < userPrizes[j].target) {
                        let temp = userPrizes[i];
                        userPrizes[i] = userPrizes[j];
                        userPrizes[j] = temp;
                    }
                    
                }
            }

        });

        const bars = userPrizes.map((p) =>
            <Col className='bar' style={{marginTop:'50px'}}>
                <text style={{fontWeight:'600'}}>{p.name}</text>
                <br />
                <text>{getProgressText(p.target - books.length)}</text>
                <ProgressBar striped variant="success" now={(books.length/p.target)*100} style={{marginTop:'15px'}} />
            </Col>
        );

        return bars;
    }

    function toggleVisible() {
        setVisible(!visible);
    }

    const refresh = (e) => {
        window.location.reload();
    }

          
    return (
        <div>
            <div className={disp1}>
                <Navbar name={name} />
                <Container>
                    <Row className='row-1' style={{marginBottom:'-50px'}}>
                        <Card className='main-card'>
                            <Card.Title className='title'>Your Progress <Button className='refresh' onClick={(e) => refresh(e)}>Refresh</Button></Card.Title>
                        </Card>
                    </Row>
                    <Row className='row-2'>
                        <Container>
                            {getBars()}
                        </Container>
                    </Row>

                    <Row className='row-1'>
                        <Link to="/newbook">
                            <Button className='add-book' variant="info" onClick={toggleVisible}>I READ <br /> A BOOK!</Button>
                        </Link>
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

            <div className={disp2}>
                <Navbar name={name} />
                <br />
                <br />
                <h2 className='welcome-text'>Welcome to the All Saints Reading Club!<br/> <text style={{fontWeight: '300'}}>To get started, create a new account with your school email (or login if you already have an account).</text></h2>
                <img src={vacation} style={{marginLeft:'8.5vw', marginTop:'50px'}} />
                <img src={logo} style={{width: '150px', marginLeft: '44vw', marginTop: '50px'}} />
            </div>

        </div>
    )
};
export default MainPage;

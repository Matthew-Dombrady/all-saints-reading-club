import React, { useState, useEffect, useReducer } from 'react';
import '../styles.css'; 

import {Form, Button, Dropdown, Container} from 'react-bootstrap';

import "firebase/auth";
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

import { firebaseApp } from '../firebase';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";  


const BookForm=(props) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [pages, setPages] = useState(-1);

    const [pickQuestions, setPickQuestions] = useState([]);
    const [q1, setq1] = useState('Pick a question to answer');
    const [q2, setq2] = useState('Pick a question to answer');
    const [q3, setq3] = useState('Pick a question to answer');

    const [a1, seta1] = useState('');
    const [a2, seta2] = useState('');
    const [a3, seta3] = useState('');

    const [min, setMin] = useState(-1);
    const [minPages, setMinPages] = useState(-1);


    const questions1 = [
        "Who was your favourite character and why?",
        "What did the story remind you of?",
        "Was the book fiction or non-fiction?",
        "How did the book make you feel? (happy, sad, scared)",
        "Who read the book?",
        "Would you read the book again?"
    ];

    const questions2 = [
        "How did you experience the book? Were you engaged immediately or did it take you a while to 'get into it'?",
        "How did you feel reading it—amused, sad, disturbed, confused, bored...?",
        "Are the main characters dynamic—changing or maturing by the end of the book?",
        "Is the plot engaging—do you find the story interesting?",
        "Is this a plot-driven book—a fast-paced page-turner or does the plot unfold slowly with a focus on character?",
        "Were you surprised by complications, twists and turns?",
        "Did you find the plot predictable, even formulaic?",
        "If you could ask the author a question, what would you ask?",
        "Have you read other books by the same author? If so how does this book compare. If not, does this book inspire you to read others?"
    ];


    useEffect(() => {

        if (props.grade <= 0) {
            setPickQuestions(questions1);
            setMin(2);
            setMinPages(0);
        }

        else {
            setPickQuestions(questions2);
            setMin(5);
            setMinPages(props.grade*10);
        }

        console.log(props.userid);

    },
    []
    );

    const ok = (e) => {

        const lenA1 = a1.split('.');
        const lenA2 = a2.split('.');
        const lenA3 = a3.split('.');


        console.log("Num", props.numBooks);

        if (title == "" || author == "" || pages == -1) {
            alert("Please make sure you filled in all information!");
            e.preventDefault();
        }

        else if (lenA1.length < min || lenA2.length < min || lenA3.length < min) {
            alert("Please make sure your answers are at least " + min + " sentences!");
            e.preventDefault();
        }

        else if (pages < Math.abs(minPages)) {
            alert("Please make sure your book is at least " + Math.abs(minPages) + " long!");
            e.preventDefault();
        }

        else {

            fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/student-createBook?userid=' + props.userid + '&title=' + title + '&author=' + author + '&pages=' + pages + '&q1=' + q1 + '&q2=' + q2 + '&q3=' + q3 + '&a1=' + a1 + '&a2=' + a2 + '&a3=' + a3)
            .then(response => console.log("Created book?", response))
            .catch((error) => {
                console.error('Error:', error.message);
            });      

            fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/student-increaseBook?userid=' + props.userid + '&num=' + props.booksNum)
            .then(response => console.log("Increased books?", response))
            .catch((error) => {
                console.error('Error:', error.message);
            });      
            
        }



    }

    function getQuestions(n) {

        const qList = pickQuestions.map((q) =>
            <DropdownItem onClick={(e) => setQuestion(e,n)}>{q}</DropdownItem>
        );

        return qList;

    }

    const setQuestion = (e,n) => {
        console.log(e);
        //alert(e.target.textContent);

        /*if ((q1 == q2 || q1 == q3 || q2 == q3) && (q1 != "Pick a question to answer" && q2 != "Pick a question to answer")) {
            alert("Please pick three different questions to answer!");
            
        }*/

        var q;

        if (props.grade < 2) {
            q = questions1;
        }

        else {
            q = questions2;
        }



        if (n == 1) {
            setq1(e.target.textContent);

            var index1 = q.indexOf(e.target.textContent);

            var index2 = index1;
            var index3 = index1;
        
            if (q2 != 'Pick a question to answer') {
                index2 = q.indexOf(q2);
            }

            if (q3 != 'Pick a question to answer') {
                index3 = q.indexOf(q3);
            }


            var newQuestions = [];
            for (var i = 0; i < q.length; i++) {
                if (i != index1 && i != index2 && i != index3) {
                    newQuestions.push(q[i]);
                }
            }

            setPickQuestions(newQuestions);
    
        }
    
        else if (n == 2) {
            setq2(e.target.textContent);

            var index2 = q.indexOf(e.target.textContent);

            var index1 = index2;
            var index3 = index2;
        
            if (q1 != 'Pick a question to answer') {
                index1 = q.indexOf(q1);
            }

            if (q3 != 'Pick a question to answer') {
                index3 = q.indexOf(q3);
            }

            var newQuestions = [];
            for (var i = 0; i < q.length; i++) {
                if (i != index1 && i != index2 && i != index3) {
                    newQuestions.push(q[i]);
                }
            }

            setPickQuestions(newQuestions);

        }
    
        else if (n == 3) {
            setq3(e.target.textContent);

            var index3 = q.indexOf(e.target.textContent);

            var index1 = index3;
            var index2 = index3;
        
            if (q1 != 'Pick a question to answer') {
                index1 = q.indexOf(q1);
            }

            if (q2 != 'Pick a question to answer') {
                index2 = q.indexOf(q2);
            }

            var newQuestions = [];
            for (var i = 0; i < q.length; i++) {
                if (i != index1 && i != index2 && i != index3) {
                    newQuestions.push(q[i]);
                }
            }

            setPickQuestions(newQuestions);

        }    

    }

    function getMinSentences() {
        return "Minimum of " + min + " sentences. NO maximum!";
    }

    function getPagePlaceholder() {
        return "At least " + Math.abs(minPages) + " pages";
    }


    return (
        <div>
            <Container>
                <Form style={{marginTop:'35px', marginBottom:'50px'}}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control placeholder="Enter title of the book" onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control placeholder="Enter author of the book" onChange={(e) => setAuthor(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Number of Pages</Form.Label>
                        <Form.Control placeholder={getPagePlaceholder()} onChange={(e) => setPages(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    {q1}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {getQuestions(1)}
                                </Dropdown.Menu>
                            </Dropdown>  
                        </Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder={getMinSentences()} onChange={(e) => seta1(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {q2}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {getQuestions(2)}
                                </Dropdown.Menu>
                            </Dropdown>  
                        </Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder={getMinSentences()} onChange={(e) => seta2(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {q3}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {getQuestions(3)}
                                </Dropdown.Menu>
                            </Dropdown>  
                        </Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder={getMinSentences()} onChange={(e) => seta3(e.target.value)} />
                    </Form.Group>

                    <Link to ='/'>
                        <Button variant="primary" type="button" onClick={ok} className='form-button'>Done!</Button>
                    </Link>

                    <Link to='/'>
                        <Button variant='light' className='form-button'>Close</Button>
                    </Link>

                </Form>

            </Container>
        </div>
    )
};
export default BookForm;

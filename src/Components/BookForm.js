import React, { useState, useEffect, useReducer, useRef } from 'react';
import '../styles.css'; 

import {Form, Button, Dropdown, Container, Tab, Tabs} from 'react-bootstrap';

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

    const [upload, setUpload] = useState(false);

    const [drawing, setDrawing] = useState(false);



    const inputFile = useRef(null);


    const questions1 = [
        "Who was your favourite character?",
        "What did you like about this character?",
        "Can you retell the story in your own words?",
        "Where does the story take place?",
        "Is there anything you would change in the story? Why or why not?",
        "What is one fact you learned from reading this book?",
        "Draw and upload a picture of something you learned. Label the picture with a title or caption."
    ];

    const questions2 = [
        "If you could invite any character over to your house which one would it be? Why?",
        "Is your book fiction or nonfiction? How do you know? List two clues.",
        "Which character in the story can you relate to? How are they like you? How are they different?",
        "Re-write the ending of the story. What is different about your ending?",
        "Would you read another book by the same author? Why?",
        "What three facts did you learn from this text? Did anything surprise or shock you?",
        "Of the information that you learned about, which would you like to share with someone else?",
        "What kind of research did the author need in order to write this book?",
        "Is this book similar to any other books you have read? If so, how are they alike? How are they different?",
        "How can you learn more about this topic?",
        "What else would you like to learn about this topic?",
        "Draw and upload a brand-new cover for the book. Include a title."
    ];

    const questions3 = [
        "How did you experience the book? Were you engaged immediately or did it take you a while to 'get into it'?",
        "How did you feel reading it—amused, sad, disturbed, confused, bored...?",
        "Are the main characters dynamic—changing or maturing by the end of the book?",
        "Is the plot engaging—do you find the story interesting?",
        "Is this a plot-driven book—a fast-paced page-turner or does the plot unfold slowly with a focus on character?",
        "Were you surprised by complications, twists and turns?",
        "Did you find the plot predictable, even formulaic?",
        "If you could ask the author a question, what would you ask?",
        "Have you read other books by the same author? If so how does this book compare. If not, does this book inspire you to read others?",
        "What are five facts you learned from this text?",
        "What kind of research did the author need in order to write this book?",
        "What is it about this topic that interests you?",
        "What did you already know about this topic before you started reading the book?",
        "If you could ask the author a question, what would it be?",
        "Did the book make you consider future jobs that you could have? What are they?"
    ];



    useEffect(() => {

        if (props.grade <= 2) {
            setPickQuestions(questions1);
            setMin(2);
            setMinPages(0);
        }

        else if (props.grade == 3 || props.grade == 4) {
            setPickQuestions(questions2);
            setMin(5);
            setMinPages(props.grade*10);
        }

        else if (props.grade == 5 || props.grade == 6 || props.grade == 7 || props.grade == 8) {
            setPickQuestions(questions3);
            setMin(5);
            setMinPages(props.grade*10);
        }


        console.log(props.userid);

    },
    []
    );

    const ok = (e) => {

        const lenA1 = a1.split(/[!,.]+/);
        const lenA2 = a2.split(/[!,.]+/);
        const lenA3 = a3.split(/[!,.]+/);


        console.log("Num", props.numBooks);

        if (title == "" || author == "" || pages == -1) {
            alert("Please make sure you filled in all information!");
            e.preventDefault();
        }

        else if (props.grade > !drawing && (lenA1.length < min || lenA2.length < min || lenA3.length < min)) {
            alert("Please make sure your answers are at least " + min + " sentences!");
            e.preventDefault();
        }

        else if (props.grade <=0 && !drawing && (lenA1.length < min || lenA2.length < min || lenA3.length < min)) {
            alert("Please make sure your answers are at least " + min + " sentences or draw a picture instead!");
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
        return "Minimum of " + min + " sentences. NO maximum! Make sure to use proper punctuation (periods, commas, exclamation marks).";
    }

    function getPagePlaceholder() {
        return "At least " + Math.abs(minPages) + " pages";
    }

    function getPictureOrQuestions() {

        console.log("GRADE", props.grade);

        if (props.grade <= 0) {
            return  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="questions" title="Answer 3 Questions" onClick={() => {setDrawing(false)}}>
                    <Form.Group style={{marginTop:'25px'}}>
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
    
                </Tab>
                <Tab eventKey="picture" title="Draw a Picture" onClick={() => {setDrawing(true)}}>
                    <h3 className='drawing-text'>You can add a picture or drawing here!</h3>
                    <input type='file' id='file' ref={inputFile} accept="image/png, image/jpeg" style={{marginBottom:'50px'}} />
                </Tab>
            </Tabs>;
    
        }

        else {
            return <div>
                                    <Form.Group style={{marginTop:'25px'}}>
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

            </div>;
        }

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

                    {getPictureOrQuestions()}

                    <Link to ={{
                        pathname:'/',
                        props: {
                            reload:true
                        }
                    }}>
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

import React, { useState } from 'react';
import '../styles.css'; 

import {Form, Button} from 'react-bootstrap';

import "firebase/auth";
import { firebaseApp } from '../index';

const SignUp=(props) => {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [grade, setGrade] = useState("");

    function hide() {
        props.toggleVisible(false);
    }

    const createAccount = () => {


        if (email == "" || password == "" || grade == "") {
            alert("Please make sure you filled in your email, password and grade!");
        }

        else if (password != password2) {
            alert("Passwords are different!");
        }

        else {

            firebaseApp.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("User signed up");
                    console.log(userCredential);

                    const Http = new XMLHttpRequest();
                    const url='http://localhost:5000/all-saints-reading-club/us-central1/student-addStudent?firstName=' + first + '&lastName=' + last + '&grade=' + grade + '&email=' + email;
                    Http.open("GET", url);
                    Http.send();

                    Http.onreadystatechange = (e) => {
                        console.log(Http.responseText)
                    }

                    hide();

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert("ERROR: " + errorMessage);
                    console.log(error);

            });
        }

    }

    return (
        <Form>
            <Form.Group controlId="formBasicFirst">
                <Form.Label>First name</Form.Label>
                <Form.Control type="first" placeholder="First name" onChange={(e) => setFirst(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicLast">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="last" placeholder="Last name" onChange={(e) => setLast(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formReEnterPassword">
                <Form.Label>Re-enter password</Form.Label>
                <Form.Control type="password" placeholder="Re-enterPassword" onChange={(e) => setPassword2(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>What grade are you in?</Form.Label>
                <Form.Control as="select" placeholder='Choose from list' onChange={(e) => setGrade(e.target.value)} >
                    <option>JK</option>
                    <option>SK</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="button" onClick={createAccount}>
                Sign Up
            </Button>
            <Button variant='light' onClick={hide}>Close</Button>
        </Form>
    )
};
export default SignUp;

import React, { useState } from 'react';
import '../styles.css'; 

import {Form, Button, Dropdown} from 'react-bootstrap';

import "firebase/auth";
import { firebaseApp } from '../firebase';

const Login=(props) => {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [grade, setGrade] = useState("");

    function hide() {
        props.toggleVisible(false);
    }

    const login = () => {

        if (email == "" || password == "") {
            alert("Please make sure you filled in your email and password!");
        }

        else {

            firebaseApp.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("User logged in");
                    console.log(userCredential);
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

            <Button variant="primary" type="button" onClick={login}>
                Login
            </Button>
            <Button variant='light' onClick={hide}>Close</Button>
        </Form>
    )
};
export default Login;

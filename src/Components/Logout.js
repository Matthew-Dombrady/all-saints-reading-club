import React, { useState } from 'react';
import '../styles.css'; 

import {Form, Button, Dropdown} from 'react-bootstrap';

import "firebase/auth";
import { firebaseApp } from '../firebase';

const Logout=(props) => {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [grade, setGrade] = useState("");

    function hide() {
        props.toggleVisible(false);
    }

    const logout = () => {

        console.log("Signing out");
        firebaseApp.auth().signOut()
            .then((userCredential) => {
                window.location.reload();
            })
            .catch((error)=>{
                var errorMessage = error.message;
                console.log("Error signing out:", errorMessage);
        });
    }

    return (
        <Form>
            <Button variant="primary" type="button" onClick={logout}>
                Yes
            </Button>
            <Button variant='light' onClick={hide}>No</Button>
        </Form>
    )
};
export default Logout;

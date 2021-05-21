import React, { useState } from 'react';
import '../styles.css'; 
import { firebaseApp } from '../firebase';

import {Navbar, Nav, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';

import logo from '../Assets/school_logo.png';


const MenuBar=(props) => {

    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    function displayName(n) {
        if (n != "") {
            return "Hello, " + n + "!";
        }

        else {
            return "Welcome!"
        }
    }

    return (

        <Navbar bg="light" expand="lg" style={{width:'100vw'}}>
            <Navbar.Brand href="#home"><img src={logo} className='logo' /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                    <OverlayTrigger
                            placement="bottom"
                            show={visible1}
                            overlay={
                                <Popover id={`popover-positioned-bottom`}>
                                <Popover.Title as="h3">Login </Popover.Title>
                                <Popover.Content>
                                    <Login toggleVisible={setVisible1} />
                                </Popover.Content>
                                </Popover>
                            }
                            >
                            <Button variant="primary" onClick={setVisible1}>Login</Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                            placement="bottom"
                            show={visible}
                            overlay={
                                <Popover id={`popover-positioned-bottom`}>
                                <Popover.Title as="h3">Create New Account </Popover.Title>
                                <Popover.Content>
                                    <SignUp toggleVisible={setVisible} />
                                </Popover.Content>
                                </Popover>
                            }
                            >
                            <Button variant="light" style={{marginLeft:'5px'}} onClick={setVisible}>Join the Club!</Button>
                    </OverlayTrigger>
                    <h2 style={{marginLeft:'825px', marginTop:'5px', fontSize:'30px'}}>{displayName(props.name)}</h2>

                    <OverlayTrigger
                            placement="bottom"
                            show={visible2}
                            overlay={
                                <Popover id={`popover-positioned-bottom`}>
                                <Popover.Title as="h3">Logout?</Popover.Title>
                                <Popover.Content>
                                    <Logout toggleVisible={setVisible2} />
                                </Popover.Content>
                                </Popover>
                            }
                            >
                        <Button variant="light" style={{width: "80px", height: "40px", marginLeft: "5px", marginTop: "5px"}} onClick={setVisible2}>Logout</Button>
                    </OverlayTrigger>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
export default MenuBar;

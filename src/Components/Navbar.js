import React, { useState } from 'react';
import '../styles.css'; 
import { firebaseApp } from '../index';

import {Navbar, Nav, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import SignUp from './SignUp';
import Login from './Login';


const MenuBar=() => {

    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);

    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Reading Club</Navbar.Brand>
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

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
export default MenuBar;

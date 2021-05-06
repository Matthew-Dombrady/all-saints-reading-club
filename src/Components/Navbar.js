import React from 'react';
import '../styles.css'; 
import './SignUp';



import {Navbar, Nav, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import SignUp from './SignUp';

const MenuBar=() => {

    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Reading Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                    <OverlayTrigger
                            trigger="click"
                            placement="bottom"
                            overlay={
                                <Popover id={`popover-positioned-bottom`}>
                                <Popover.Title as="h3">Create New Account</Popover.Title>
                                <Popover.Content>
                                    <SignUp />
                                </Popover.Content>
                                </Popover>
                            }
                            >
                            <Button variant="secondary">Join the Club!</Button>
                    </OverlayTrigger>
                    <Nav.Link href="#signin">Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
export default MenuBar;

import React, { useEffect, useState } from 'react';
import '../styles.css'; 
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";  

import {Button} from 'react-bootstrap';


const BookConfirmation=() => {

    const refresh = (e) => {
        window.location.reload();
    }
     
    return (
        <div>
            Good job!
            <Link to='/'>
                <Button variant='light' className='form-button'>OK</Button>
            </Link>
        </div>
    )
};
export default BookConfirmation;

import React, { useEffect, useState } from 'react';

import './App.css';
import './Components/MainPage'

import MainPage from './Components/MainPage';
import BookForm from './Components/BookForm';

import { firebaseApp } from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";  


function App() {

  const [uid, setUid] = useState('');

  const [name, setName] = useState('');
  const [grade, setGrade] = useState(-2);
  const [prizeName, setPrizeName] = useState('');
  const [prizeTarget, setPrizeTarget] = useState(0);
  
  const [books, setBooks] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [numBooks, setNumBooks] = useState(-1);
  


  
  
  firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
          setUid(user.uid);
  
      } else {
          console.log("Not logged in");
      }
  });
  
  useEffect(() => {
  
      // Fetch student
      fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/all-saints-reading-club/us-central1/student-getStudent?uid=' + uid)
      .then(response => response.json())
      .then(student => gotStudent(student))
      .catch((error) => {
          console.error('Error:', error.message);
      });
  
      // Fetch prizes
      fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/all-saints-reading-club/us-central1/student-getPrizes')
      .then(response => response.json())
      .then(przs => gotPrizes(przs))
      .catch((error) => {
          console.error('Error:', error.message);
      });
      
  
  },
  [uid, grade, numBooks]
  );
  
  
  function gotStudent(s) {

      setName(s.firstName);
      setGrade(s.grade);
      setNumBooks(s.num_books);

      console.log("NEXT:", s.next_prize);
  
      fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/all-saints-reading-club/us-central1/student-getPrize?id=' + s.next_prize)
      .then(response => response.json())
      .then(prize => gotPrize(prize))
      .catch((error) => {
          console.error('Error:', error.message);
      });
  
      
      fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/all-saints-reading-club/us-central1/student-getUserBooks?uid=' + uid)
      .then(response => response.json())
      .then(bks => gotBooks(bks))
      .catch((error) => {
          console.error('Error:', error.message);
      });
  }
  
  function gotBooks(b) {
      setBooks(b);
  }
  
  function gotPrizes(p) {
      setPrizes(p);
  }
  
  function gotPrize(p) {
      setPrizeName(p.name);
      console.log("P", p);
  
      if (grade < 2 && grade > -2) {
          setPrizeTarget(p.target1);
      }
  
      else if (grade >= 2) {
          setPrizeTarget(p.target2);
      } 
  }
  
  
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/newbook">
            <BookForm grade={grade} userid={uid} numBooks={numBooks} />
          </Route>

          <Route path="/">
            <MainPage name={name} grade={grade} prizes={prizes} prizeTarget={prizeTarget} prizeName={prizeName} books={books} uid={uid} />
          </Route>
        </Switch>
      </Router>
    </div>
);
}

export default App;

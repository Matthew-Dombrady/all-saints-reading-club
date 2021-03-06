import React, { useEffect, useState } from 'react';

import './App.css';
import './Components/MainPage'

import MainPage from './Components/MainPage';
import BookForm from './Components/BookForm';
import BookConfirmation from './Components/BookConfirmation';

import { firebaseApp } from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";  


function App() {

  const [uid, setUid] = useState('');

  const [name, setName] = useState('');
  const [last, setLast] = useState('');

  const [grade, setGrade] = useState(-2);
  const [prizeName, setPrizeName] = useState('');
  const [prizeTarget, setPrizeTarget] = useState(0);
  
  const [books, setBooks] = useState([]);
  const [prizes, setPrizes] = useState([]);
  


  
  
  firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
          setUid(user.uid);
  
      } else {
          console.log("Not logged in");
      }
  });
  
  useEffect(() => {
  
      // Fetch student
      fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/student-getStudent?uid=' + uid)
      .then(response => response.json())
      .then(student => gotStudent(student))
      .catch((error) => {
          console.error('Error:', error.message);
      });
  
      // Fetch prizes
      fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/student-getPrizes')
      .then(response => response.json())
      .then(przs => gotPrizes(przs))
      .catch((error) => {
          console.error('Error:', error.message);
      });
        
  },
  [uid, grade]
  );
  
  
  function gotStudent(s) {

      setName(s.firstName);
      setLast(s.lastName);
      setGrade(s.grade);

      console.log("NEXT:", s.next_prize);
  
      fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/student-getPrize?id=' + s.next_prize)
      .then(response => response.json())
      .then(prize => gotPrize(prize))
      .catch((error) => {
          console.error('Error:', error.message);
      });
  
      
      fetch('https://us-central1-all-saints-reading-club.cloudfunctions.net/student-getUserBooks?uid=' + uid)
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
  
      if (grade <= 2) {
          setPrizeTarget(p.target1);
      }
  
      else if (grade == 3 && grade == 4) {
          setPrizeTarget(p.target2);
      } 

      else if (grade >= 5) {
        setPrizeTarget(p.target3);
    } 

  }
  
  
  return (
    <div>
      <Router>
        <Switch>

          <Route path="/newbook">
            <BookForm grade={grade} userid={uid} />
          </Route>

          <Route path="/confirm">
            <BookConfirmation />
          </Route>


          <Route path="/">
            <MainPage name={name} last={last} grade={grade} prizes={prizes} prizeTarget={prizeTarget} prizeName={prizeName} books={books} uid={uid} />
          </Route>


        </Switch>
      </Router>
    </div>
);
}

export default App;

import React from 'react';
import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UserProfile from './UserProfile';
import ContactList from './ContactList';
import Calendar from './Calendar';
import Modal from 'react-modal'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [contacts, setContacts] = useState(null)
  // const [filteredContacts, setFilteredContacts] = useState(null)

  // autologin fetch, to keep us logged in while refreshing
  // fetch GET to userscontroller #show method
  useEffect(() => {
    fetch ('/api/me')
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data)
          setCurrentUser(data)
        })
      }
    })
  }, [])

  // fetching all contacts, to filter for currentUser ownership and then pass down to children components
  useEffect(() => {
      fetch('/api/contacts')
      .then(response => response.json())
      .then(data => {
          setContacts(data)
      })
  }, [])





  return (
    <div className="app">

      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />


        <Routes>

          <Route path="/" element={<Home />} />
            
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            
          <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />

          <Route path="/userprofile" element={<UserProfile currentUser={currentUser} />} />
            
          <Route path="/contactlist" element={<ContactList 
          // setFilteredContacts={setFilteredContacts} 
          contacts={contacts} currentUser={currentUser} />} />

          <Route path="/calendar" element={<Calendar 
          // filteredContacts={filteredContacts}
          contacts={contacts} currentUser={currentUser} />} />

        </Routes>

    </div>
  );
}

export default App;

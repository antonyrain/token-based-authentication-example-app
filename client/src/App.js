import './App.css';
import React from "react";
//Hooks
import { useState, useEffect } from "react";
//Services
import { getAll, create } from "./services/notes";
import { login } from "./services/login";

function App() {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  useEffect(() =>{
    getAll().then(returnedData => setNotes(returnedData))
  },[])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {content: newNote}
    create(noteObject).then(ruturnedData => {
      setNotes(notes.concat(ruturnedData))
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    login(credentials).then(returnedData => {
      const token = returnedData
      localStorage.setItem("token", token);
    })
    console.log('logging in with', username, password)
    setTimeout(()=>{window.location.reload(false)}, 500);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(()=>{window.location.reload(false)}, 500);
  }

  const isToken = localStorage.getItem("token")
  const loginMessage = isToken !== null
  ? {display: "none"}
  : {display: "block"}

  return (
    <div className="notes-screen-container">
        <h1>Short Messages</h1>
        <h3 style={loginMessage}> Log in to leave a message</h3>
        
    <form onSubmit={handleLogin}>
      <div>Username<input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>Password<input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">log In</button>
      <button onClick={handleLogout}>Log Out</button>
    </form>
          <ul>
              {notes.map(note =>
              <li key={note.id}>
                <p>{note.content}</p>
              </li>
              )}
          </ul>
          <form onSubmit={addNote}>
              <input 
                  value={newNote}
                  onChange={handleNoteChange}
              />
              <button type="submit">save</button>
          </form>
      </div>
    );
}

export default App;

import React, { useState } from 'react'
import Signup from './components/Signup/signUp.js'
import Login from './components/Login/Login.js'
import Home from './components/Home/Home.js'
import Message from './components/Message/message.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App = () => {
  const [username ,setUsername] = useState("");
  const [roomno, setRoomNo] = useState("");

  const usernamelogin = (username) => {
    console.log("Username: ", username);
    setUsername(username);
  }

  const roomnoupdate = (roomno) => {
    console.log("roomno: ", roomno);
    setRoomNo(roomno);
  }

  return ( 
    // <Signup/>
    <Router>

      <Switch>
          <Route path="/signup">  
            <Signup/>
          </Route>
          <Route path="/login">
            <Login usernamelogin = {usernamelogin}/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/message">
            <Message username={username} roomnoupdate = {roomnoupdate}/>
          </Route>
      </Switch>
    </Router>
   );
}
 
export default App;
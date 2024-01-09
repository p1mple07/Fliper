import React from 'react'
import Signup from './components/Signup/signUp.js'
import Login from './components/Login/Login.js'
import Home from './components/Home/Home.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App = () => {
  return ( 
    // <Signup/>
    <Router>

      <Switch>
          <Route path="/signup">  
            <Signup/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          
      </Switch>
    </Router>
   );
}
 
export default App;
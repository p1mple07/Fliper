import React from 'react'
import Signup from './components/Signup/signUp.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return ( 
    <Signup/>
    // <div>
    //   <Login/>
    // </div>
    // <Router>
    //         {/* <Switch>
    //             <Route path="/signin" component={Login} />
    //             {/* <Route path="/home" component={Home} /> */}
    //             {/* Add other routes as needed */}
    //             {/* <Redirect from="/" to="/signin" /> */}
    //         {/* </Switch> */ }
    //          <Route path="/" element={<Login />} />
    //          {/* <Route path="users/*" element={<Users />} /> */}
    //     </Router>
   );
}
 
export default App;
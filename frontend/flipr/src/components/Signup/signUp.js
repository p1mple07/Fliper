import React, { useState } from "react";
import './signup.css'
import axios from 'axios';
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [signIn,setSignIn] = useState(false)
    // const history = useHistory();
    // const navigate = useNavigate();
    
    // const navigate = useNavigate();
        
    // const onButtonClick = () => {
    //     // You'll update this function later...
    //     const response = await axios.post('', formData);
    // }
    const onButtonClick1 = async (e) => {
        console.log("clicked")
        console.log('Username:', username);
        console.log('Password:', password);
        e.preventDefault();

        try {
            // Make a POST request using axios
            // const response = await axios.post('http://localhost:5000/login', {username: username, password: password});
            const response = await axios.post('http://localhost:5000/signUp', { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Handle the response as needed
            console.log('Response:', response.data);
            setSignIn(true)
            // navigate('/');
        } catch (error) {
            // Handle errors
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const onButtonClick2 = async (e) => {
        // // navigate('/login');
        // history.push('/login'); // Navigate to the login page
        console.log('login button clicked');
    };
    return <div className={"mainContainer"}>
        {signIn&&<div className={"successfulsignin"}>
            <div>Successfully signed in! Now please login.</div>
        </div>}
        <div className={"titleContainer"}>
            <div>Sign Up</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={username}
                placeholder="Enter your username here"
                onChange={ev => setUsername(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{usernameError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className="buttonContainer">
            <div className="inputContainer">
                <input
                className="inputButton"
                type="button"
                onClick={onButtonClick1}
                value="Register"
                />
                <Link to="/login" className="inputButton" >Login</Link>
            </div>
        {/* <div className="inputContainer"> */}
            {/* <input
            className="inputButton"
            type="button"
            onClick={onButtonClick2}
            value="Login"
            /> */}
        {/* </div> */}
        </div>
    </div>
}

export default Signup

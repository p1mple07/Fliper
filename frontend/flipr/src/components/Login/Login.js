import React, { useState } from "react";
import './Login.css'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import { Link, Redirect } from 'react-router-dom'

const Login = ({usernamelogin}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [signIn,setSignIn] = useState(false)
    const [pwinc, setPwInc] = useState(false)
    const [usernotexist, setUserNotExist] = useState(false)


    
    // const navigate = useNavigate();
    
    // const navigate = useNavigate();
        
    // const onButtonClick = () => {
    //     // You'll update this function later...
    //     const response = await axios.post('', formData);
    // }
    const onButtonClick = async (e) => {
        console.log("clicked")
        console.log('Username:', username);
        console.log('Password:', password);
        e.preventDefault();
        setPwInc(false);
        setUserNotExist(false);
        

        try {
            const response = await axios.post('http://localhost:5000/login', { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            // Handle the successful response
            console.log('Response:', response.data);
            setSignIn(true);
            usernamelogin(username);
            // navigate('/');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response error:', error.response.data);
                console.error('Status code:', error.response.status);
        
                if (error.response.status === 401) {
                    // Handle incorrect password
                    console.error('Password is incorrect');
                    setPwInc(true);
                } else if (error.response.status === 409) {
                    // Handle username not found
                    console.error('Username does not exist');
                    setUserNotExist(true);
                } else {
                    // Handle other response errors
                    console.error('Other response error');
                }
            } else {
                // The request was made but no response was received
                // or there was a network error
                console.error('Request error:', error.message);
            }
        }
    };

    return <div className={"mainContainer"}>
        {signIn && <Redirect to="/home" />}
        {pwinc&&<div className={"error"}>
            <div>Password is incorrect.</div>
        </div>}
        {usernotexist&&<div className={"error"}>
            <div>This username does not exist. Please signup first.</div>
        </div>}
        <div className={"titleContainer"}>
            <div>Login</div>
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
            <div className={"inputContainer"}>
                <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Login"} />
                <Link to="/signup" className="inputButton" >Singup</Link>
            </div>
        </div>
        {/* <div className="inputContainer">
            <Link to="/signup" className="inputButton" >Singup</Link>
            {/* <input
            className="inputButton"
            type="button"
            onClick={onButtonClick2}
            value="Login"
            /> */} 
        {/* </div> */}
    </div>
}

export default Login

import React, { useContext } from 'react';
import './loginpopup.css';
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import { CartContext } from "../../component/Context/CartContext";
import axios from 'axios'

const LoginPopup = ({ setShowLoginPopup }) => {

    const { url, setToken } = useContext(CartContext);

    const [currState, setCurrState] = React.useState("Login")
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
 
 const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;

    if (currState === "Login") {
        newUrl += "/api/user/login";
    } else {
        newUrl += "/api/user/register";
    }

    console.log("Request URL:", newUrl);

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        setShowLoginPopup(false);
    } else {
        alert(response.data.message);
    }
};

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-tittle">
                    <h2>{currState}</h2>
                    <button onClick={() => setShowLoginPopup(false)} className='login-popup-close-icon'>
                        <RxCross1 />
                    </button>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit' className='login-popup-submit-btn'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}


            </form>
        </div>
    );
}

export default LoginPopup;

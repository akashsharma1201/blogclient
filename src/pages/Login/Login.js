import React, { useState } from 'react';
import "./Login.css";
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../baseUrl';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const logincredential = { email, password, }
    const navigate = useNavigate()
    const formValidation = async () => {
        if (email && password) {
            try {
                const response = await axios.post(`${baseUrl}/app/api/user/login`, logincredential)
                const { message, user, token, success } = response.data
                toast.success(message, {
                    position: toast.POSITION.TOP_CENTER
                });
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user))
                navigate("/")

            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("All fields are required !", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const formSubmitHandler = (event) => {
        event.preventDefault()
        formValidation()
        setEmail("")
        setPassword("")

    }

    return (
        <>
            <Navbar />
            <div className='login-form-box '>

                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 mx-auto'>

                            <form onSubmit={formSubmitHandler}>
                                <h2>Login</h2>
                                <div className='form-field-box'>
                                    <label>Email</label>
                                    <input type='text' placeholder='Enter Name' value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <div className='form-field-box'>
                                    <label>Password</label>
                                    <input type='password' placeholder='Enter Name' value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <button className='type'>Submit</button>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login
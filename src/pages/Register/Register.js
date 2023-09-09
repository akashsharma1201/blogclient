import React, { useState } from 'react';
import "./Register.css";
import { userRegisterAction } from '../../redux/actions/userAction';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../baseUrl';

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")

    const newUser = { name, email, password, rePassword }
    const navigate = useNavigate()

    const formValidation = async () => {
        if (name && email && password && rePassword) {
            if (password == rePassword) {
                try {
                    const response = await axios.post(`${baseUrl}/app/api/user/register`, newUser)

                    const { message, user, token, success } = response.data
                    console.log(message, user, token, success);
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
                // alert("Password and ConfirmPassword do not  match")
                toast.error("Password and ConfirmPassword do not  match", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } else {
            toast.error("All fields are required", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const formSubmitHandler = (event) => {
        event.preventDefault()
        formValidation()

        setName("")
        setEmail("")
        setPassword("")
        setRePassword("")
    }

    return (
        <>
            <Navbar />
            <div className='register-form-box'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 mx-auto'>
                            <form onSubmit={formSubmitHandler}>
                                <h2>Register</h2>
                                <div className='form-field-box'>
                                    <label>Name</label>
                                    <input type='text' placeholder='Enter Name' value={name} onChange={(event) => setName(event.target.value)} />
                                </div>
                                <div className='form-field-box'>
                                    <label>Email</label>
                                    <input type='text' placeholder='Enter Name' value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <div className='form-field-box'>
                                    <label>Password</label>
                                    <input type='password' placeholder='Enter Name' value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <div className='form-field-box'>
                                    <label>Confirm Password</label>
                                    <input type='password' placeholder='Enter Name' value={rePassword} onChange={(event) => setRePassword(event.target.value)} />
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

export default Register
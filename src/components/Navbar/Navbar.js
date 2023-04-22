import React, { useEffect, useRef, useState } from 'react';
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [username, setUsername] = useState(null)
    const mynavbar = useRef(null);
    const navigate = useNavigate();

    // console.log(user);


    useEffect(() => {
        gsap.from(mynavbar.current, { y: -60, duration: 1, opacity: 0, ease: "power1.out(1.2)" })
    }, [])



    useEffect(() => {
        let user = localStorage.getItem("user")
        setUsername(JSON.parse(user))
    }, [])


    const LogoutHandler = () => {
        localStorage.clear()
        navigate("/login")
        // setUsername(null)
    }
    return (
        <div className='mynavbar' ref={mynavbar}>
            <div className='_navbar'>
                <NavLink to="/"><h3 className='_mb'>Blog</h3></NavLink>
                <div className='auth-menu d-flex'>

                    <NavLink to="/">Home</NavLink>
                    {
                        username ?
                            <div>
                                <NavLink to="/createblog">Create Blog</NavLink>
                                <span className='px-2'>{username?.name}</span>
                                <button className='btn btn-danger log-out-btn' onClick={LogoutHandler}> Log out</button>
                            </div>
                            :
                            <>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register">Register</NavLink>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar
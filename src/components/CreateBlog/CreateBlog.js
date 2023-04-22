import React, { useState } from 'react';
import "./CreateBlog.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [file, setFile] = useState(null)
    const [content, setContent] = useState("")
    const [autherId, setAutherId] = useState("")
    const nevigate = useNavigate()


    const formSubmitHandler = async (event) => {
        event.preventDefault()
        const user = localStorage.getItem("user");

        const { auther_id } = JSON.parse(user)
        setAutherId(auther_id)
        const formdata = new FormData()
        formdata.set("title", title)
        formdata.set("summary", summary)
        formdata.set("file", file[0])
        formdata.set("content", content)
        formdata.set("auther_id", autherId)
        // console.log(file);

        console.log(title);
        console.log(summary);
        console.log(file);
        console.log(content);

        try {
            const response = await axios.post("http://localhost:5000/app/api/blog/createblog/", formdata)
            console.log(response.data);
           
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER
            })

        } catch (error) {
            console.log(error.message);
        }


        setTitle("")
        setSummary("")
        setContent(null)
        setFile("")
        setAutherId("")

        nevigate("/")
    }
    return (
        <>
            <Navbar />
            <div className='create-blog-wrapper'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12   '>
                            <h2 className='text-center'>Create Your New Blog</h2>
                        </div>
                        <div className='col-md-8  mx-auto'>
                            <div className='bost-form-wrapper'>
                                <form onSubmit={formSubmitHandler}>
                                    <input type='text' placeholder='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
                                    <input type='text' placeholder='summary' value={summary} onChange={(event) => setSummary(event.target.value)} />
                                    <input type='file' onChange={(event) => setFile(event.target.files)} />
                                    <textarea value={content} onChange={(event) => setContent(event.target.value)}></textarea>
                                    <button>Create Blog</button>
                                </form>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CreatePost
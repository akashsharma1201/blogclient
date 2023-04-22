import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./UploadBlog.css"
import { ToastContainer, toast } from 'react-toastify';

const UpdateBlog = () => {

    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [file, setFile] = useState(null)
    const [content, setContent] = useState("")
    const [autherId, setAutherId] = useState("64393724a96eaf34859c0b93")
    const nevigate = useNavigate()



    const { id } = useParams();
    console.log(id);
    const [blog, setBLog] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`http://localhost:5000/app/api/blog/getblog/${id}`); // Replace with your API endpoint
                console.log(response.data.blogs);
                setBLog(response.data.blogs);
                // setPosts(jsonData);
                setTitle(response.data.blogs.title)
                setSummary(response.data.blogs.summary)
                setContent(response.data.blogs.content)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const formSubmitHandler = async (event) => {
        event.preventDefault()
        // const formdata = new FormData()
        // formdata.set("title", title)
        // formdata.set("summary", summary)
        // formdata.set("content", content)
        // formdata.set("auther_id", autherId)
        // console.log(form);

        const data = {
            title,
            summary,
            content
        }
        console.log(data);
        const token = localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            'Content-Type': 'application/json'
        };
        try {
            const response = await axios.put(`http://localhost:5000/app/api/blog/updateblog/${id}`, data ,config)
            console.log(response.data);
            toast.success(response.data.message,{
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            console.log(error.message);
        }

        setTitle("")
        setSummary("")
        setContent(null)
        setFile("")
        nevigate("/")
    }


    return (
        <>
            <Navbar />
            <div className='create-blog-wrapper'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12   '>
                            <h2 className='text-center'>Update Your Blog</h2>
                        </div>
                        <div className='col-md-8  mx-auto'>
                            <div className='bost-form-wrapper'>
                                <form onSubmit={formSubmitHandler}>
                                    <input type='text' placeholder='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
                                    <input type='text' placeholder='summary' value={summary} onChange={(event) => setSummary(event.target.value)} />
                                    {/* <input type='file' onChange={(event) => setFile(event.target.files)} /> */}
                                    <textarea value={content} onChange={(event) => setContent(event.target.value)}></textarea>
                                    <button>Update Blog</button>
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

export default UpdateBlog
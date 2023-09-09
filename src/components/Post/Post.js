import React, { useEffect, useState } from 'react';
import "./Post.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const Post = () => {

    const [posts, setPosts] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios(`${baseUrl}/app/api/blog/allblog`); // Replace with your API endpoint
            console.log(response.data.blogs);
            setPosts(response.data.blogs);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteblog = async (id) => {
        console.log(id);
        const token = localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            'Content-Type': 'application/json'
        };
        try {
            const response = await axios.delete(`${baseUrl}/app/api/blog/deleteblog/${id}`, config
            )
            toast.error(response.data, {
                position: toast.POSITION.TOP_CENTER
            });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER
            });;
        }
        fetchData();
    }


    return (

        [
            posts.map((post, index) => {
                const id = post._id
                return (
                    <div className='post-wrapper' key={index}>
                        <div className='post-image-wrapper'>
                            <img src={`${baseUrl}` + post?.image} className='img-fluid' />
                        </div>
                        <div className='post-text-wrapper'>
                            <Link to={`blogdeatil/${post._id}`}> <h2>{post?.title}</h2></Link>
                            <div>
                                <span className='auther'>{post.auther_id?.name}</span>
                                <span className='date'>12 / 06 /2012</span>
                                <p>{post?.summary}</p>
                            </div>

                        </div>
                        <div className='update-delete-btns'>
                            <Link to={`updateblog/${post._id}`} className='update'>Update</Link>
                            <button onClick={() => deleteblog(post._id)} className='delete'>Delete</button>
                        </div>
                        <ToastContainer />
                    </div>

                )
            })
        ]
    )
}

export default Post
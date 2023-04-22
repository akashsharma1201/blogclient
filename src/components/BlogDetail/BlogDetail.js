import React, { useEffect, useState } from 'react';
import "./BlogDetail.css"
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const {id} = useParams();
  console.log(id);
  const [blog ,setBLog] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios(`http://localhost:5000/app/api/blog/getblog/${id}`); // Replace with your API endpoint
            console.log(response.data.blogs);
            setBLog(response.data.blogs);
            // setPosts(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

  return (
    <><Navbar />
      <div className='blogdetail-page'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 mx-auto'>
              <div className='deatil-post-wrapper flex-column' >
                <div className='deatil-post-image-wrapper'>
                  <img src={"http://localhost:5000/" + blog.image} className='img-fluid' />
                </div>
                <div className='deatil-post-text-wrapper'>
                  <h2>{blog.title}</h2>
                  {/* <p>{post._id}</p> */}
                  <div>
                    <span className='auther'>{blog.auther_id?.name}</span>
                    <span className='date'>12 / 06 /2012</span>
                    <p>{blog.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>



    // <></>
  )
}

export default BlogDetail
import React from 'react';
import "./Home.css"
import Post from '../../components/Post/Post';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  return (
    <>
    <Navbar />
     <div className='Home-page'>
      <Post />
      {/* <Post /> */}
      {/* <Post /> */}
    </div>
    </>

  )
}

export default Home
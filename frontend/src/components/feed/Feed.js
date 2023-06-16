import './Feed.css'

import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import { fetchPosts, handleSendingNewPost } from '../../fetchers';
import Navbar from '../navbar/Navbar';

const Feed = ({ navigate }) => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    fetchPosts(token, setToken, setPosts);
  }, [])
    
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSendingNewPost(token, message, "/posts").then(() => {
      fetchPosts(token, setToken, setPosts)
    }
    )
    setMessage('');
  }

    if(token) {
      return(
        <>
          <Navbar navigate={ navigate }/>
        <div className="feed-container">
            <h1 className='feed-title'>Enter the Trelloship</h1>
            <form className="post-form" onSubmit={handleSubmit}>
              <textarea
                className='feelings' 
                id='message'
                value={message}
                onChange={(event) => setMessage(event.target.value)} 
                type='text' 
                placeholder='Your feelings matter, my precious...' 
                required>
              </textarea>
              <button className='submit-button' id='submit'>Post</button>
            </form>

            <div className='feed' id='feed' role="feed">
              {posts.map(
                // index is counting the times i map
                (post, index) => ( <Post post={ post } key={ post._id + index } /> )
              ).reverse()}
            </div>
        </div>
      </>
    )
    } else {
      navigate('/signin')
    }
}

export default Feed;

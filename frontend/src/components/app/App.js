import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import Home from '../Home/Home'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState();
  // want to have the token state in App 
    return (
        <Routes>
          <Route path='/' element={<Home navigate={ useNavigate() }/>}/>
          <Route path='/posts'  element={<Feed
            navigate={ useNavigate() }
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}/>}/>
          <Route path='/login'  element={<LoginForm  
          navigate={ useNavigate() }
          token={token}
          setToken={setToken}
          user={user}
          setUser={setUser}/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
        </Routes>
    );
}

export default App;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {Login} from './login/login'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { User } from './user/user';
import { Home } from './home/home';


export default function App() {
  return ( <BrowserRouter>  ( <div>)

<Routes>
 <Route path='/' element={<Home />} exact />
 <Route path='/login' element={<Login />} />
 <Route path='/user' element={<User />} />
 <Route path='*' element={<NotFound />} />
</Routes>
</div>
</BrowserRouter>
  );
};

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
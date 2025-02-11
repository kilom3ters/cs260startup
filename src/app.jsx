import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {Login} from './login/login'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { User } from './user/user';

export default function App() {
  return <BrowserRouter> 
  <div className='app bg-dark text-light'> 
    <header className="container-fluid">
        <nav className='navbar fixed-top navbar-dark'>
            <div className='navbar-brand'>
                Gamelog<sup>&reg;</sup>
                    </div>
  <menu className='navbar-nav'>
    <li className='nav-item'>
      <NavLink className='nav-link' to='/'>
        Home
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='login'>
        Login
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='user'>
        User
      </NavLink>
    </li>
  </menu>
</nav>
</header>

<Routes>
 <Route path='/' element={<Home />} exact />
 <Route path='/login' element={<Login />} />
 <Route path='/user' element={<User />} />
 <Route path='*' element={<NotFound />} />
</Routes>

<footer>
    <div class="container">
          <div class="container-fluid">
            <p>Miles Johnson: <a href = "https://github.com/kilom3ters/cs260startup/tree/main"> GitHub Repository</a></p>
          </div>
    </div>
    </footer>
</div>
</BrowserRouter>
};

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
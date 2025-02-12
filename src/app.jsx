import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {Login} from './login/login'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { User } from './user/user';
import { Home } from './home/home';


export default function App() {
  return ( <BrowserRouter>  <div><nav className="navbar bg-white">
    <div className="container-fluid">
      <form className="d-flex ms-auto" role="search">
        <input className="form-control me-2" type="search" placeholder="Search Users" aria-label="Search"></input>
        <button className="btn btn-outline-dark" type="submit">Search</button>
      </form>
    </div>
  </nav>

<Routes>
 <Route path='/' element={<Home />} exact />
 <Route path='/login' element={<Login />} />
 <Route path='/user' element={<User />} />
 <Route path='*' element={<NotFound />} />
</Routes>

<footer>
  <div className="footer">
    <div className="container">
          <div className="container-fluid">
            <p>Miles Johnson: <a href = "https://github.com/kilom3ters/cs260startup/tree/main"> GitHub Repository</a></p>
          </div>
    </div>
    </div>
    </footer>
</div>
</BrowserRouter>
  );
};

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
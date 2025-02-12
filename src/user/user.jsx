import React from 'react';
import { useNavigate } from 'react-router-dom';
import './user-styles.css';

export function User() {
  const navigate = useNavigate();

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 bg-black text-white vh-100 p-3 sidebar">
            <div className="text-center">
              <img src="assets/images/IMG_0868.JPG" width="100" alt="User Profile" />
              <h4>Nathanael Tate Cotton</h4>
              <button className="btn btn-light w-100 mt-2">+ Add Friend</button>
            </div>
            <hr />
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Friends</a>
              </li>
              <li className="nav-item">
                <button className="nav-link text-danger fw-bold btn btn-link" onClick={() => navigate('/login')}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>

          <div className="col-md-9 col-lg-10 p-4">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <form className="input-group">
                  <input type="text" className="form-control" placeholder="Find games..." />
                  <button className="btn btn-dark" type="submit">Search</button>
                </form>
              </div>
            </div>

            <div className="row my-4">
              <div className="col-12 text-center">
                <h1>Welcome, Nathanael Tate Cotton</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="card bg-black text-white text-center p-3">
                  <h4>Games This Month</h4>
                  <p className="fs-3">3</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center text-black p-3">
                  <h4>Favorite Game</h4>
                  <div className="align-items-center">
                    <img src="assets/images/gfkart.webp" width="100" alt="Favorite Game" />
                  </div>
                  <small>Garfield Kart Furious Racing</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-black text-white text-center p-3">
                  <h4>Total Games</h4>
                  <p className="fs-3">98</p>
                </div>
              </div>
            </div>

            <div className="row my-4">
              <div className="col-12">
                <h3>Game Lists</h3>
                <table className="table table-black table-striped">
                  <tbody>
                    <tr><td>Must Play Games</td><td>Resident Evil 4</td></tr>
                    <tr><td>To-Play List</td><td>Mass Effect 2</td></tr>
                    <tr><td>Did Not Finish</td><td>Elden Ring</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row my-4">
              <div className="col-12">
                <h3>Friends</h3>
                <table className="table table-striped">
                  <tbody>
                    <tr><td>Bob Dylan</td></tr>
                    <tr><td>Taylor Swift</td></tr>
                    <tr><td>Katy Perry</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row my-4">
              <div className="col-md-6 mx-auto">
                <h3>Recent Games</h3>
                <ul className="list-group">
                  <li className="list-group-item">Life is Strange</li>
                  <li className="list-group-item">The Fox in the Forest</li>
                  <li className="list-group-item">Balatro</li>
                  <li className="list-group-item">Hades II</li>
                  <li className="list-group-item">Soma</li>
                  <li className="list-group-item">Outlast</li>
                </ul>
                <a href="#" className="d-block text-center mt-2">See all games</a>
                <div className="logout-button">
                  <button onClick={() => navigate('/home')} className="btn btn-dark btn-lg w-100 mb-3">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div> 
    </main>
  );
}

  import React from 'react';
  import { useNavigate } from 'react-router-dom';
  import './user-styles.css';
  
  export function User() {
    const navigate = useNavigate();
  
    return (
   
      
      <div>
      <nav className="navbar-user bg-white">
            <form className="d-flex ms-auto" role="search">
              <input className="form-control me-2" type="search" placeholder="Search Users" aria-label="Search" />
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
        </nav>
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
                <a className="nav-link text-white w-100" href="#">Friends</a>
              </li>
              <li className="nav-item">
                <button className="logout-button w-100 text-danger fw-bold" onClick={() => navigate('/')}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>


            <div className="main-content-user">

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

            <div className="row my-4 justify-content-center">
  <div className="col-md-10 col-lg-8 mx-auto text-center"> 
    <h3>Game Lists</h3>
    <div className="table-responsive">
      <table className="table table-black table-striped text-center mx-auto"> 
        <tbody>
          <tr><td>Must Play Games</td><td>Resident Evil 4</td></tr>
          <tr><td>To-Play List</td><td>Mass Effect 2</td></tr>
          <tr><td>Did Not Finish</td><td>Elden Ring</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div className="row my-4 justify-content-center">
  <div className="col-md-10 col-lg-8 mx-auto text-center">
    <h3>Friends</h3>
    <div className="table-responsive">
      <table className="table table-striped text-center mx-auto">
        <tbody>
          <tr><td>Bob Dylan</td></tr>
          <tr><td>Taylor Swift</td></tr>
          <tr><td>Katy Perry</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


<div className="row my-4 justify-content-center">

    <h3>Recent Games</h3>
    <ul className="list-group mx-auto w-100" style={{ maxWidth: "500px" }}>
      <li className="list-group-item">Life is Strange</li>
      <li className="list-group-item">The Fox in the Forest</li>
      <li className="list-group-item">Balatro</li>
      <li className="list-group-item">Hades II</li>
      <li className="list-group-item">Soma</li>
      <li className="list-group-item">Outlast</li>
    </ul>
    <a href="#" className="d-block text-center mt-2">See all games</a>


                <div className="logout-button">
                  <button onClick={() => navigate('/')} className="btn btn-dark btn-lg w-100 mb-3">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div> 


  );
}

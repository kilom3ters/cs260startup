import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './user-styles.css';

export function User() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("username") || "Nathanael Tate Cotton";

  const defaultCategories = [
    {
      name: 'Must Play Games',
      items: [
        { name: 'Resident Evil 4', image: 'assets/images/resident-evil-4.jpg' }
      ]
    },
    {
      name: 'To Play',
      items: [
        { name: 'Mass Effect 2', image: 'assets/images/mass-effect-2.jpg' }
      ]
    },
    {
      name: 'Favorites',
      items: [
        { name: 'Elden Ring', image: 'assets/images/elden-ring.jpg' },
        { name: 'Resident Evil 4', image: 'assets/images/resident-evil-4.jpg' },
        { name: 'The Binding of Isaac', image: 'assets/images/binding-of-isaac.jpg' }
      ]
    }
  ];

  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem('gameCategories');
    if (stored) {
      return JSON.parse(stored);
    } else {
      localStorage.setItem('gameCategories', JSON.stringify(defaultCategories));
      return defaultCategories;
    }
  });

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('gameCategories', JSON.stringify(categories));
  }, [categories]);

  const categoryListStyle = {
    display: 'flex',
    overflowX: 'auto',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '20px',
    maxWidth: '400px', 
    margin: '0 auto'
  };

  const categoryItemStyle = (isSelected) => ({
    padding: '10px 20px',
    marginRight: '10px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#007bff' : '#f7f7f7',
    color: isSelected ? '#fff' : '#000',
    borderRadius: '5px',
    whiteSpace: 'nowrap'
  });

  const itemListStyle = {
    display: 'flex',
    overflowX: 'auto',
    padding: '10px',
    maxWidth: '400px', 
    margin: '0 auto'
  };


  const itemStyle = {
    minWidth: '150px',
    marginRight: '10px',
    textAlign: 'center',
    background: '#f7f7f7',
    borderRadius: '5px',
    padding: '10px'
  };

  const handleAddCategory = () => {
    const newCategoryName = prompt("Enter new category name:");
    if (newCategoryName) {
      const newCategory = { name: newCategoryName, items: [] };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setSelectedCategoryIndex(updatedCategories.length - 1);
    }
  };

  const handleAddItem = () => {
    const itemName = prompt("Enter new item (game) name:");
    const itemImage = prompt("Enter the URL for the item image:");
    if (itemName && itemImage) {
      const newItem = { name: itemName, image: itemImage };
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories];
        const updatedCategory = { 
          ...updatedCategories[selectedCategoryIndex],
          items: [...updatedCategories[selectedCategoryIndex].items, newItem]
        };
        updatedCategories[selectedCategoryIndex] = updatedCategory;
        return updatedCategories;
      });
    }
  };

  const selectedCategory = categories[selectedCategoryIndex];

  const friends = [
    { name: 'Bob Dylan', image: 'assets/images/friend-bob.jpg' },
    { name: 'Taylor Swift', image: 'assets/images/friend-taylor.jpg' },
    { name: 'Katy Perry', image: 'assets/images/friend-katy.jpg' }
  ];

  const friendListStyle = {
    display: 'flex',
    overflowX: 'auto',
    padding: '10px',
    maxWidth: '400px',
    margin: '0 auto'
  };

  const friendItemStyle = {
    minWidth: '120px',
    marginRight: '10px',
    textAlign: 'center',
    background: '#f7f7f7',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer'
  };

  const handleFriendClick = (friend) => {
    console.log('Clicked friend:', friend.name);
  };

  return (
    <div>
      <nav className="navbar-user bg-white">
        <form className="d-flex ms-auto" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Users"
            aria-label="Search"
          />
          <button className="btn btn-outline-dark" type="submit">
            Search
          </button>
        </form>
      </nav>

      <div className="row">
        <div className="col-md-3 col-lg-2 bg-black text-white vh-100 p-3 sidebar">
          <div className="text-center">
            <img src="assets/images/IMG_0868.JPG" width="100" alt="User Profile" />
            <h4>{userName}</h4>
            <button className="btn btn-light w-100 mt-2">+ Add Friend</button>
          </div>
          <hr />
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-white w-100" href="#">
                Friends
              </a>
            </li>
            <li className="nav-item">
              <button
                className="logout-button w-100 text-danger fw-bold"
                onClick={() => navigate('/')}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>

        <div className="main-content-user">
          <div className="row my-4">
            <div className="col-12 text-center">
              <h1>Welcome, {userName}</h1>
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
            <div className="col-12">
              <h3>GameLogs</h3>
              <div style={categoryListStyle}>
                {categories.map((category, index) => {
                  const isSelected = selectedCategoryIndex === index;
                  return (
                    <div
                      key={index}
                      style={categoryItemStyle(isSelected)}
                      onClick={() => setSelectedCategoryIndex(index)}
                    >
                      {category.name}
                    </div>
                  );
                })}
                <div style={categoryItemStyle(false)} onClick={handleAddCategory}>
                  + Add Category
                </div>
              </div>

              <h4 style={{ marginTop: '20px' }}>{selectedCategory.name}</h4>
              <div style={itemListStyle}>
                {selectedCategory.items.length > 0 ? (
                  selectedCategory.items.map((item, index) => (
                    <div key={index} style={itemStyle}>
                      <img src={item.image} alt={item.name} width="100" />
                      <p>{item.name}</p>
                    </div>
                  ))
                ) : (
                  <p>No items in this category.</p>
                )}
              </div>
              <button onClick={handleAddItem} style={{ marginTop: '10px' }}>
                + Add Item
              </button>
            </div>
          </div>

          <div className="row my-4 justify-content-center">
            <div className="col-12">
              <h3>Friends</h3>
              <div style={friendListStyle}>
                {friends.map((friend, index) => (
                  <div
                    key={index}
                    style={friendItemStyle}
                    onClick={() => handleFriendClick(friend)}
                  >
                    <img src={friend.image} alt={friend.name} width="80" style={{ borderRadius: '50%' }} />
                    <p>{friend.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="logout-button">
            <button
              onClick={() => navigate('/')}
              className="btn btn-dark btn-lg w-100 mb-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

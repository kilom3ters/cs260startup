import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './user-styles.css';

export function User() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("username") || "Nathanael Tate Cotton";

  const [profilePic, setProfilePic] = useState(() => localStorage.getItem("profilePic") || "assets/images/IMG_0868.JPG");
  const [favoriteGame, setFavoriteGame] = useState(() => {
    const stored = localStorage.getItem("favoriteGame");
    return stored ? JSON.parse(stored) : { image: "assets/images/gfkart.webp", name: "Garfield Kart Furious Racing" };
  });

  const defaultCategories = [
    {
      name: 'Favorites',
      items: [
        { name: 'Elden Ring', image: 'assets/images/elden-ring.jpg' },
        { name: 'Resident Evil 4', image: 'assets/images/resident-evil-4.jpg' },
        { name: 'The Binding of Isaac', image: 'assets/images/binding-of-isaac.jpg' }
      ]
    },
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

  const getTotalUniqueGames = () => {
    const allGames = categories.flatMap(category => category.items.map(item => item.name));
    const uniqueGames = new Set(allGames);
    return uniqueGames.size;
  };
  
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  
  useEffect(() => {
    localStorage.setItem('gameCategories', JSON.stringify(categories));
  }, [categories]);

  const [friends, setFriends] = useState(() => {
    const stored = localStorage.getItem("friends");
    return stored ? JSON.parse(stored) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);
  

  const handleEditProfilePic = () => {
    const newPic = prompt("Enter new profile picture URL:", profilePic);
    if(newPic) {
      setProfilePic(newPic);
      localStorage.setItem("profilePic", newPic);
    }
  };

  const handleEditFavoriteGame = () => {
    const newName = prompt("Enter new favorite game name:", favoriteGame.name);
    const newImage = prompt("Enter new favorite game image URL:", favoriteGame.image);
    if(newName && newImage) {
      const newFav = { name: newName, image: newImage };
      setFavoriteGame(newFav);
      localStorage.setItem("favoriteGame", JSON.stringify(newFav));
    }
  };

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
    whiteSpace: 'nowrap',
    position: 'relative'
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
    padding: '10px',
    position: 'relative'
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

  const handleDeleteCategory = (index) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
      if (selectedCategoryIndex === index) {
        setSelectedCategoryIndex(0);
      } else if (selectedCategoryIndex > index) {
        setSelectedCategoryIndex(selectedCategoryIndex - 1);
      }
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

  const handleDeleteItem = (itemIndex) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories];
        const updatedItems = updatedCategories[selectedCategoryIndex].items.filter(
          (_, i) => i !== itemIndex
        );
        updatedCategories[selectedCategoryIndex] = {
          ...updatedCategories[selectedCategoryIndex],
          items: updatedItems
        };
        return updatedCategories;
      });
    }
  };

  const handleAddFriend = () => {
    const friendName = prompt("Enter your friend's name:");
    const friendImage = prompt("Enter your friend's profile image URL:");
    if (friendName && friendImage) {
      setFriends([...friends, { name: friendName, image: friendImage }]);
    }
  };  

  const selectedCategory = categories[selectedCategoryIndex];

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
          <input className="form-control me-2" type="search" placeholder="Search Users" aria-label="Search" />
          <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </nav>

      <div className="row">
        <div className="col-md-3 col-lg-2 bg-black text-white vh-100 p-3 sidebar">
          <div className="text-center">
            <img src={profilePic} width="100" alt="User Profile" style={{ cursor: 'pointer' }} onClick={handleEditProfilePic} />
            <h4>{userName}</h4>
            <button className="btn btn-light w-100 mt-2" onClick={handleAddFriend}>
              + Add Friends
              </button>
            <p style={{ fontSize: '12px', cursor: 'pointer', color: '#ccc' }} onClick={handleEditProfilePic}>
              Edit Picture
            </p>
          </div>
          <hr />
          <ul className="nav flex-column">
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
              <h1>Welcome, {userName}</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card bg-black text-white text-center p-3">
                <h4>GameLogs</h4>
                <p className="fs-3">{categories.length}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center text-black p-3">
                <h4>Favorite Game</h4>
                <div className="align-items-center">
                  <img src={favoriteGame.image} width="100" alt="Favorite Game" style={{ cursor: 'pointer' }} onClick={handleEditFavoriteGame} />
                </div>
                <small>{favoriteGame.name}</small>
                <p style={{ fontSize: '12px', cursor: 'pointer', color: '#007bff' }} onClick={handleEditFavoriteGame}>
                  Edit Favorite Game
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-black text-white text-center p-3">
                <h4>Total Games</h4>
                <p className="fs-3">{getTotalUniqueGames()}</p>
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
                    <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                      <div style={categoryItemStyle(isSelected)} onClick={() => setSelectedCategoryIndex(index)}>
                        {category.name}
                      </div>
                      <button
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          background: 'red',
                          border: 'none',
                          color: 'white',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(index);
                        }}
                      >
                        x
                      </button>
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
                    <div key={index} style={{ ...itemStyle, position: 'relative' }}>
                      <img src={item.image} alt={item.name} width="100" />
                      <p>{item.name}</p>
                      <button
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          background: 'red',
                          border: 'none',
                          color: 'white',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                        onClick={() => handleDeleteItem(index)}
                      >
                        x
                      </button>
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

          <div style={friendListStyle}>
                {friends.length > 0 ? (friends.map((friend, index) => (
                  <div key={index} style={friendItemStyle}>
                    <img src={friend.image} width="80" style={{ borderRadius: '50%' }} alt={friend.name} />
                    <p>{friend.name}</p>
                  </div>
                  ))) : (
                  <p>No friends added yet.</p>
                  )}
          </div>

          <div className="logout-button">
            <button onClick={() => navigate('/')} className="btn btn-dark btn-lg w-100 mb-3">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

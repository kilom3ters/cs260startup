import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './user-styles.css';
import {
  getTotalUniqueGames,
  handleEditProfilePic,
  handleEditFavoriteGame,
  handleAddCategory,
  handleDeleteCategory,
  handleAddItem,
  handleDeleteItem,
  handleAddFriend,
  handleFriendClick
} from './user-functions.js';

export function User() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("username") || "Nathanael Tate Cotton";

  const [profilePic, setProfilePic] = useState(() => localStorage.getItem("profilePic") || "");
  
  const [favoriteGame, setFavoriteGame] = useState(() => {
    const stored = localStorage.getItem("favoriteGame");
    return stored ? JSON.parse(stored) : null;
  });
  
  const defaultCategories = [
    {
      name: 'Played Games',
      items: []
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

  const [friends, setFriends] = useState(() => {
    const stored = localStorage.getItem("friends");
    return stored ? JSON.parse(stored) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  const selectedCategory = categories[selectedCategoryIndex];

  return (
    <div>
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar">
          <div className="text-center">
            {profilePic ? (
              <img src={profilePic} width="100" alt="User Profile" className="profile-pic" onClick={() => handleEditProfilePic(setProfilePic)} />
            ) : (
              <p className="profile-text" onClick={() => handleEditProfilePic(setProfilePic)}>No Profile Picture Set</p>
            )}
            <p className="profile-text" onClick={() => handleEditProfilePic(setProfilePic)}>
              {profilePic ? "Edit Profile Picture" : "Add Profile Picture"}
            </p>
            <h4>{userName}</h4>
            <button className="btn btn-light w-100 mt-2" onClick={() => handleAddFriend(friends, setFriends)}>
              + Add Friends
            </button>
          </div>
          <hr />
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="logout-button" onClick={() => navigate('/')}>
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
                  {favoriteGame ? (
                    <>
                      <img src={favoriteGame.image} width="100" alt="Favorite Game" className="profile-pic" onClick={() => handleEditFavoriteGame(setFavoriteGame, favoriteGame)} />
                      <small>{favoriteGame.name}</small>
                    </>
                  ) : (
                    <p>No Favorite Game Set</p>
                  )}
                  <p className="profile-text" onClick={() => handleEditFavoriteGame(setFavoriteGame, favoriteGame)}>
                    {favoriteGame ? "Edit Favorite Game" : "Add Favorite Game"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-black text-white text-center p-3">
                <h4>Total Games</h4>
                <p className="fs-3">{getTotalUniqueGames(categories)}</p>
              </div>
            </div>
          </div>

          <div className="row my-4 justify-content-center">
            <div className="col-12">
              <h3>GameLogs</h3>
              <div className="category-list">
                {categories.map((category, index) => (
                  <div key={index} className="category-item-container">
                    <div className={`category-item ${selectedCategoryIndex === index ? "selected" : ""}`} onClick={() => setSelectedCategoryIndex(index)}>
                      {category.name}
                    </div>
                    <button className="delete-button" onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(index, categories, setCategories, selectedCategoryIndex, setSelectedCategoryIndex);
                    }}>
                      x
                    </button>
                  </div>
                ))}
                <div className="add-category" onClick={() => handleAddCategory(categories, setCategories, setSelectedCategoryIndex)}>
                  + Add Category
                </div>
              </div>

              <h4>{selectedCategory.name}</h4>
              <div className="item-list">
                {selectedCategory.items.length > 0 ? (
                  selectedCategory.items.map((item, index) => (
                    <div key={index} className="item">
                      <img src={item.image} alt={item.name} width="100" />
                      <p>{item.name}</p>
                      <button className="delete-button" onClick={() => handleDeleteItem(index, categories, setCategories, selectedCategoryIndex)}>
                        x
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No games logged yet.</p>
                )}
              </div>
              <button className="add-item-button" onClick={() => handleAddItem(categories, setCategories, selectedCategoryIndex)}>
                + Add Item
              </button>
            </div>
          </div>
          
          <h3>Friends</h3>
          <div className="friend-list">
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <div key={index} className="friend-item" onClick={() => handleFriendClick(friend)}>
                  <img src={friend.image} width="80" className="profile-pic" alt={friend.name} />
                  <p>{friend.name}</p>
                </div>
              ))
            ) : (
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

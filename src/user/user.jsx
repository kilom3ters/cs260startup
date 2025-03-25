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

  const [profilePic, setProfilePic] = useState("");
  const [favoriteGame, setFavoriteGame] = useState(null);
  const defaultCategories = [{ name: 'Played Games', items: [] }];
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [friends, setFriends] = useState([]);
  const [userName, setUserName] = useState("Unknown User");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/user", { credentials: "include" });
        if (!response.ok) throw new Error("Unauthorized");
        const data = await response.json();
        setUserName(data.user.username || "Unknown User");
        setProfilePic(data.user.profilePic || "");
        setFavoriteGame(data.user.favoriteGame || null);
        setCategories(data.user.gameCategories?.length ? data.user.gameCategories : defaultCategories);
        setFriends(data.user.friends || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await fetch("/logout", { method: "POST", credentials: "include" });
      navigate("/login");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar">
          <div className="text-center">
            {profilePic ? (
              <img
                src={profilePic}
                width="100"
                alt="User Profile"
                className="profile-pic"
                onClick={() => handleEditProfilePic(setProfilePic)}
              />
            ) : (
              <p className="profile-text" onClick={() => handleEditProfilePic(setProfilePic)}>
                No Profile Picture Set
              </p>
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
              <button className="logout-button" onClick={handleLogout}>
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
                      <img
                        src={favoriteGame.image}
                        width="100"
                        alt="Favorite Game"
                        className="profile-pic"
                        onClick={() => handleEditFavoriteGame(setFavoriteGame, favoriteGame)}
                      />
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
                    <div
                      className={`category-item ${selectedCategoryIndex === index ? "selected" : ""}`}
                      onClick={() => setSelectedCategoryIndex(index)}
                    >
                      {category.name}
                    </div>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(index, categories, setCategories, selectedCategoryIndex, setSelectedCategoryIndex);
                      }}
                    >
                      x
                    </button>
                  </div>
                ))}
                <div className="add-category" onClick={() => handleAddCategory(categories, setCategories, setSelectedCategoryIndex)}>
                  + Add Category
                </div>
              </div>

              <h4>{categories[selectedCategoryIndex].name}</h4>
              <div className="item-list">
                {categories[selectedCategoryIndex].items.length > 0 ? (
                  categories[selectedCategoryIndex].items.map((item, index) => (
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
        </div>
      </div>
    </div>
  );
}

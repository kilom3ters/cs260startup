export function getTotalUniqueGames(categories) {
  const allGames = categories.flatMap(category => category.items.map(item => item.name));
  return new Set(allGames).size;
}

export async function handleEditProfilePic(setProfilePic) {
  const newPic = prompt("Enter new profile picture URL:");
  if (newPic && newPic.trim() !== "") {
    try {
      const response = await fetch("/api/user/profilePic", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profilePic: newPic })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Profile picture updated!", data.user);
        setProfilePic(data.user.profilePic);
      } else {
        console.error("Error updating profile picture:", data.msg);
      }
    } catch (error) {
      console.error("Server error updating profile picture:", error);
    }
  }
}

export async function handleEditFavoriteGame(setFavoriteGame, favoriteGame) {
  const newName = prompt("Enter new favorite game name:", favoriteGame?.name || "").trim();
  const newImage = prompt("Enter new favorite game image URL:", favoriteGame?.image || "").trim();
  if (newName && newImage && (newName !== favoriteGame?.name || newImage !== favoriteGame?.image)) {
    try {
      const response = await fetch("/api/user/favoriteGame", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ favoriteGame: { name: newName, image: newImage } })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Favorite game updated!", data.user);
        setFavoriteGame(data.user.favoriteGame);
      } else {
        console.error("Error updating favorite game:", data.msg);
      }
    } catch (error) {
      console.error("Server error updating favorite game:", error);
    }
  }
}

export async function handleAddCategory(categories, setCategories, setSelectedCategoryIndex) {
  const newCategoryName = prompt("Enter new GameLog name:").trim();
  if (newCategoryName && !categories.some(category => category.name === newCategoryName)) {
    const newCategory = { name: newCategoryName, items: [] };
    const updatedCategories = [...categories, newCategory];
    try {
      const response = await fetch("/api/user/gameCategories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gameCategories: updatedCategories })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Game categories updated!", data.user);
        setCategories(data.user.gameCategories);
        setSelectedCategoryIndex(updatedCategories.length - 1);
      } else {
        console.error("Error updating game categories:", data.msg);
      }
    } catch (error) {
      console.error("Server error updating game categories:", error);
    }
  }
}

export async function handleDeleteCategory(index, categories, setCategories, selectedCategoryIndex, setSelectedCategoryIndex) {
  if (window.confirm("Are you sure you want to delete this GameLog?")) {
    const updatedCategories = categories.filter((_, i) => i !== index);
    try {
      const response = await fetch("/api/user/gameCategories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gameCategories: updatedCategories })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Game categories updated!", data.user);
        setCategories(data.user.gameCategories);
        setSelectedCategoryIndex(Math.max(0, selectedCategoryIndex === index ? 0 : selectedCategoryIndex - 1));
      } else {
        console.error("Error updating game categories:", data.msg);
      }
    } catch (error) {
      console.error("Server error updating game categories:", error);
    }
  }
}

export async function handleAddItem(categories, setCategories, selectedCategoryIndex) {
  const itemName = prompt("Enter game (to log) name:").trim();
  const itemImage = prompt("Enter the URL for the item image:").trim();
  if (itemName && itemImage) {
    const updatedCategories = [...categories];
    updatedCategories[selectedCategoryIndex] = {
      ...updatedCategories[selectedCategoryIndex],
      items: [...updatedCategories[selectedCategoryIndex].items, { name: itemName, image: itemImage }]
    };
    try {
      const response = await fetch("/api/user/gameCategories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gameCategories: updatedCategories })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Game categories updated!", data.user);
        setCategories(data.user.gameCategories);
      } else {
        console.error("Error updating game categories:", data.msg);
      }
    } catch (error) {
      console.error("Server error updating game categories:", error);
    }
  }
}

export async function handleDeleteItem(itemIndex, categories, setCategories, selectedCategoryIndex) {
  if (window.confirm("Are you sure you want to delete this game?")) {
    const updatedCategories = [...categories];
    updatedCategories[selectedCategoryIndex] = {
      ...updatedCategories[selectedCategoryIndex],
      items: updatedCategories[selectedCategoryIndex].items.filter((_, i) => i !== itemIndex)
    };
    try {
      const response = await fetch("/api/user/gameCategories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gameCategories: updatedCategories })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Game categories updated!", data.user);
        setCategories(data.user.gameCategories);
      } else {
        console.error("Error updating game categories:", data.msg);
      }
    } catch (error) {
      console.error("Server error updating game categories:", error);
    }
  }
}

export async function handleAddFriend(friends, setFriends) {
  const friendName = prompt("Enter your friend's name:").trim();
  const friendImage = prompt("Enter your friend's profile image URL:").trim();
  if (friendName && friendImage && !friends.some(friend => friend.name === friendName)) {
    const newFriends = [...friends, { name: friendName, image: friendImage }];
    try {
      const response = await fetch("/api/user/friends", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friends: newFriends })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Friends updated!", data.user);
        setFriends(data.user.friends);
      } else {
        console.error("Error updating friends:", data.msg);
      }
    } catch (error) {
      console.error("Server error updating friends:", error);
    }
  }
}

export function handleFriendClick(friend) {
  console.log(`Clicked friend: ${friend.name}`);
}

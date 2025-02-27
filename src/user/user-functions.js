export function getTotalUniqueGames(categories) {
    const allGames = categories.flatMap(category => category.items.map(item => item.name));
    return new Set(allGames).size;
  }
  
  export function handleEditProfilePic(setProfilePic) {
    const newPic = prompt("Enter new profile picture URL:");
    if (newPic && newPic.trim() !== "") {
      setProfilePic(newPic);
      localStorage.setItem("profilePic", newPic);
    }
  }
  
  export function handleEditFavoriteGame(setFavoriteGame, favoriteGame) {
    const newName = prompt("Enter new favorite game name:", favoriteGame?.name || "").trim();
    const newImage = prompt("Enter new favorite game image URL:", favoriteGame?.image || "").trim();
  
    if (newName && newImage && (newName !== favoriteGame?.name || newImage !== favoriteGame?.image)) {
      const newFav = { name: newName, image: newImage };
      setFavoriteGame(newFav);
      localStorage.setItem("favoriteGame", JSON.stringify(newFav));
    }
  }
  
  export function handleAddCategory(categories, setCategories, setSelectedCategoryIndex) {
    const newCategoryName = prompt("Enter new GameLog name:").trim();
    if (newCategoryName && !categories.some(category => category.name === newCategoryName)) {
      const newCategory = { name: newCategoryName, items: [] };
      setCategories(prevCategories => [...prevCategories, newCategory]);
      setSelectedCategoryIndex(categories.length); // Select the new category
      localStorage.setItem("gameCategories", JSON.stringify([...categories, newCategory]));
    }
  }
  
  export function handleDeleteCategory(index, categories, setCategories, selectedCategoryIndex, setSelectedCategoryIndex) {
    if (window.confirm("Are you sure you want to delete this GameLog?")) {
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
      setSelectedCategoryIndex(Math.max(0, selectedCategoryIndex === index ? 0 : selectedCategoryIndex - 1));
      localStorage.setItem("gameCategories", JSON.stringify(updatedCategories));
    }
  }
  
  export function handleAddItem(categories, setCategories, selectedCategoryIndex) {
    const itemName = prompt("Enter game (to log) name:").trim();
    const itemImage = prompt("Enter the URL for the item image:").trim();
    if (itemName && itemImage) {
      setCategories(prevCategories => {
        const updatedCategories = [...prevCategories];
        updatedCategories[selectedCategoryIndex] = {
          ...updatedCategories[selectedCategoryIndex],
          items: [...updatedCategories[selectedCategoryIndex].items, { name: itemName, image: itemImage }]
        };
        localStorage.setItem("gameCategories", JSON.stringify(updatedCategories));
        return updatedCategories;
      });
    }
  }
  
  export function handleDeleteItem(itemIndex, categories, setCategories, selectedCategoryIndex) {
    if (window.confirm("Are you sure you want to delete this game?")) {
      setCategories(prevCategories => {
        const updatedCategories = [...prevCategories];
        updatedCategories[selectedCategoryIndex] = {
          ...updatedCategories[selectedCategoryIndex],
          items: updatedCategories[selectedCategoryIndex].items.filter((_, i) => i !== itemIndex)
        };
        localStorage.setItem("gameCategories", JSON.stringify(updatedCategories));
        return updatedCategories;
      });
    }
  }
  
  export function handleAddFriend(friends, setFriends) {
    const friendName = prompt("Enter your friend's name:").trim();
    const friendImage = prompt("Enter your friend's profile image URL:").trim();
    if (friendName && friendImage && !friends.some(friend => friend.name === friendName)) {
      const newFriends = [...friends, { name: friendName, image: friendImage }];
      setFriends(newFriends);
      localStorage.setItem("friends", JSON.stringify(newFriends));
    }
  }
  
  export function handleFriendClick(friend) {
    console.log(`Clicked friend: ${friend.name}`);
  }
  
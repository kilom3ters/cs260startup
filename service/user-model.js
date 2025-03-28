const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  profilePic: { type: String, default: "" },
  favoriteGame: {
    name: { type: String, default: "" },
    image: { type: String, default: "" }
  },
  gameCategories: { type: Array, default: [] },
  friends: { type: Array, default: [] }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

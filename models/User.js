const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};  

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

// Method to check if user is admin
userSchema.methods.isAdmin = function () {
  return this.role === 'admin';
};

// Method to check if user is a regular user
userSchema.methods.isUser = function () {
  return this.role === 'user';
};

// Method to check if user is authenticated 
userSchema.methods.isAuthenticated = function () {
  return !!this._id;
}


// Method to check if user is a guest
userSchema.methods.isGuest = function () {
  return !this._id;
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema);



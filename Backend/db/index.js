// Import Mongoose
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017").then(() => {
  console.log(`Data base connection success`)
})

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: { type: Number, default: 0 },
  comments: [
    {
      username: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }
  ],
  tags: [{ type: String }], // Flair-like tags
}, { timestamps: true });

// Organisation/Community Schema
const organisationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  posts: [postSchema],
  postCount: { type: Number, default: 0 },
}, { timestamps: true });

// User-to-Organisation Schema
const userToOrganisationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organisations: [
    {
      organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' },
      joinedAt: { type: Date, default: Date.now },
    }
  ],
  organisationCount: { type: Number, default: 0 },
}, { timestamps: true });

// Admin Schema
const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const Organisation = mongoose.model('Organisation', organisationSchema);
const UserToOrganisation = mongoose.model('UserToOrganisation', userToOrganisationSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Export Models
module.exports = {
  User,
  Organisation,
  UserToOrganisation,
  Admin,
};


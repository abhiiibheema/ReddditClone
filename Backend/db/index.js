// Import Mongoose
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/hack").then(() => {
  console.log('Database connection success');
});

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
  tags: [{ type: String }],
}, { timestamps: true });

const organisationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  posts: [postSchema],
  postCount: { type: Number, default: 0 },
  tagsOrg: [{ type: String }],
}, { timestamps: true });

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

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Organisation = mongoose.model('Organisation', organisationSchema);
const UserToOrganisation = mongoose.model('UserToOrganisation', userToOrganisationSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Export Models using ES module syntax
export { User, Organisation, UserToOrganisation, Admin };

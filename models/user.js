const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true
    // required: () => {
    //   return this.username != "";
    // },
  },
  email: { 
    type: String, 
    required: true,
    // required: () => {
    //   return this.email != "";
    // },
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
    // required: () => {
    //   return this.password != ""
    // },
  },
  posts: [
    {
      content: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

// need to add username to the schema

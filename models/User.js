const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      trim:true,
      unique:true,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      unique:true,
      match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
    },
    thoughts: [{
      type:Schema.Types.ObjectId,
      ref:'Thought'
    }],
    friends: [{
      type:Schema.Types.ObjectId,
      ref:'User'
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;

const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const user = await User.find({})
        .select('-__v');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

        
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
      return res.json(user)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Update a user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

        
        if (user) {
          user.username = req.body.username
          user.email = req.body.email
          const updatedUser = await user.save()
          res.json(updatedUser)
        }
       else  res.status(404).json({ message: 'No user with that ID' })
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const {username, email} = req.body
      // check user with same username
      const existingUsername = await User.findOne({username})
      if(existingUsername) return res.status(400).json({message:"User already exists with the same username"})

      // check user with same email
      const existingEmail = await User.findOne({email})
      if(existingEmail) return res.status(400).json({message:"User already exists with the same email"})

      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the thought
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an thought to a user
  async addThought(req, res) {
    console.log('You are adding an thought');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove thought from a user
  async removeThought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

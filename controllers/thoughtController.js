const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts)
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      // check if user exists
      const user = await User.findOne({username:req.body.username})

      if(user){
        // username, thoughtText
        const thought = await Thought.create(req.body);
  
        if(thought){
          user.thoughts.push(thought._id)
          const savedUser = await user.save()
          const {thoughtText, username} = thought
  
          res.json({thoughtText, username, userId:savedUser._id});
        }
      } else {
        res.status(401).json({message:"User not found"})
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId)

      if (thought) {
        thought.thoughtText = req.body.thoughtText
        const updatedThought = await thought.save()
        res.json(updatedThought);
      }
      else res.status(404).json({ message: 'No thought with this id!' });

    } catch (err) {
      res.status(500).json(err);
    }
  },
};

// const getThoughts = async (req, res) => {
//   try {
//     const thoughts = await Thought.find();
//     console.log("THOUHTS",thoughts)
//      res.json({first_thought:thoughts[0]})
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// }

// module.exports = {
//   getThoughts
// }


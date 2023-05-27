const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions')
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function () {
        return this.formatData(this.createdAt);
      },
    },
    username: {
      type: String,
      required: true,
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.methods.formatDate = function (date) {
  return date.toISOString(); 
};

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
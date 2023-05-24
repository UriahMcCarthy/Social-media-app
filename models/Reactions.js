const { Schema, Types, Mongoose } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function() {
        return this.formatDate(this.createdAt);
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Custom formatting function for the createdAt field
reactionSchema.methods.formatDate = function(date) {
  return date.toISOString(); 
};

module.exports = reactionSchema;

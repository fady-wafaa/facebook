const mongoose = require('mongoose');

const liekSchema = new mongoose.Schema(
  {
    liek: {
      type: String,
      enum: ['liek', 'love'],
      default:'liek'
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
      required:true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const Liek = mongoose.model('liek', liekSchema);
module.exports = Liek
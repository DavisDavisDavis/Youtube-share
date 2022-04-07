import mongoose from "mongoose";
const { Schema, model } = mongoose;

const videoSehcma = new Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  youtubeId: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  like: {
    type: Number,
    default: 0,
  },
});

export default model("Video", videoSehcma);

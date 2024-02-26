import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  show_id: String,
  type: String,
  title: String,
  director: String,
  cast: String,
  country: String,
  date_added: Date,
  release_year: Number,
  rating: String,
  duration: String,
  listed_in: String,
  description: String,
});

const Content = mongoose.model("content", contentSchema);
export default Content;

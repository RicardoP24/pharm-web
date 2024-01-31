
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  nif: Number,
  password: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
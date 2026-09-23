import mongoose from "mongoose";

const CredencialSchema = new mongoose.Schema(
  {
    username: String,
    Password: String,
  },
  {
    collection: "userList",
  }
);

const UserModel = mongoose.model("userList", CredencialSchema);

export default UserModel;

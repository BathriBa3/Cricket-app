import UserModel from "../models/User.model.js";

// PUT /login  (kept as-is from original — consider renaming to GET or a dedicated test route)
export const testLogin = async (req, res) => {
  console.log("entered--->");
  await UserModel.find();
  res.json(UserModel);
};

// GET /login
export const getUsers = async (req, res) => {
  try {
    console.log("entered");
    console.log("Database:", UserModel.db?.name);
    console.log("Collection:", UserModel.collection.name);

    const UserData = await UserModel.find();
    console.log("UserData:", UserData);

    res.json(UserData);
  } catch (err) {
    console.log("Database error:", err);
    res.status(500).json({
      message: "Database error",
    });
  }
};

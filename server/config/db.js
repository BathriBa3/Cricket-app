import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected....");

    mongoose.connection.once("open", () => {
      console.log("Database:", mongoose.connection.name);
    });
  } catch (err) {
    console.log(err, "err");
    process.exit(1);
  }
};

export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URL exists:", !!process.env.MONGO_URL);
    console.log("MONGO_URL length:", process.env.MONGO_URL ? process.env.MONGO_URL.length : 0);
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

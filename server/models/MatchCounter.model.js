import mongoose from "mongoose";

const MatchCountSchema = new mongoose.Schema(
  {
    _id: String,
    sequence: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "matchcounts",
  }
);

const MatchCounter = mongoose.model("matchcounts", MatchCountSchema);

export default MatchCounter;

import MatchModel from "../models/Match.model.js";
import MatchCounter from "../models/MatchCounter.model.js";

// POST /endInnings
export const endInnings = async (req, res) => {
  console.log(req.body, "request");
  try {
    console.log("entered--->");
    const counter = await MatchCounter.findOneAndUpdate(
      { _id: "match" },
      { $inc: { sequence: 1 } },
      {
        new: true,
        upsert: true,
      }
    );

    const matchNumber = `MAT${String(counter.sequence).padStart(4, "0")}`;

    const material = new MatchModel({
      matchNumber,
      ...req.body,
    });
    const savedMaterial = await material.save();

    res.status(201).json({
      message: "Material created successfully",
      data: savedMaterial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating material",
      error: error.message,
    });
  }
};

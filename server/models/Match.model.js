import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    matchNumber: {
      type: String,
      unique: true,
      required: true,
    },

    teams: {
      names: {
        A: String,
        B: String,
      },
      players: {
        A: {
          type: [mongoose.Schema.Types.Mixed],
        },
        B: {
          type: [mongoose.Schema.Types.Mixed],
        },
      },
    },
    match: {
      battingTeam: String,
      bowlingTeam: String,
      overs: String,
    },
    firstInnings: {
      battingPlayers: {
        type: mongoose.Schema.Types.Mixed,
      },
      bowlingPlayers: {
        type: mongoose.Schema.Types.Mixed,
      },
      totalScore: String,
      wickets: String,
      legalBalls: String,
      currentStriker: String,
      currentNonStriker: String,
      currentBowler: String,
    },
    secondInnings: {
      targetScore: String,
      battingPlayers: {
        type: mongoose.Schema.Types.Mixed,
      },
      bowlingPlayers: {
        type: mongoose.Schema.Types.Mixed,
      },
      totalScore: String,
      wickets: String,
      legalBalls: String,
      currentStriker: String,
      currentNonStriker: String,
      currentBowler: String,
    },
    winner: String,
  },
  {
    collection: "matches",
  }
);

const MatchModel = mongoose.model("matches", MatchSchema);

export default MatchModel;

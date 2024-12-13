const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    brightness: { type: Number, required: true },
  },
  { versionKey: false }
);

const Scenario = mongoose.model("Scenario", scenarioSchema);

module.exports = Scenario;

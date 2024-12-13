const mongoose = require("mongoose");

const scenarioRoomSchema = new mongoose.Schema(
  {
    scenario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scenario",
      required: true,
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { versionKey: false }
);

const ScenarioRoom = mongoose.model("ScenarioRoom", scenarioRoomSchema);

module.exports = ScenarioRoom;

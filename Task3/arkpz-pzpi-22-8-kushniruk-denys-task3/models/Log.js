const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    action: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  { versionKey: false }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;

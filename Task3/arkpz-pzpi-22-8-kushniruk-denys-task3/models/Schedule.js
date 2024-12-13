const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    days_of_week: { type: [String], required: true },
  },
  { versionKey: false }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;

const { connectToDatabase } = require("./database");
const User = require("./models/User");
const Room = require("./models/Room");
// const Schedule = require("./models/Schedule");
// const Scenario = require("./models/Scenario");
// const ScenarioRoom = require("./models/ScenarioRoom");
const Log = require("./models/Log");
const Light = require("./models/Light");

async function seedData() {
  try {
    await connectToDatabase();

    // Колекція Users
    const user1 = await User.create({
      email: "user1@example.com",
      password: "hashedpassword1",
      role: "user",
      firstName: "John",
      lastName: "Doe",
      profileImage: "url_to_image_1",
    });

    // Створення адміністратора
    const admin = await User.create({
      email: "admin@example.com",
      password: "hashedpassword2",
      role: "admin",
      firstName: "Admin",
      lastName: "User",
      profileImage: "url_to_image_2",
    });

    // Колекція Rooms
    const room1 = await Room.create({
      user_id: user1._id,
      name: "Кухня",
      status: true,
    });

    const room2 = await Room.create({
      user_id: user1._id,
      name: "Спальня",
      status: false,
    });

    // Колекція Schedules
    // await Schedule.insertMany([
    //   {
    //     room_id: room1._id,
    //     start_time: "07:00:00",
    //     end_time: "09:00:00",
    //     days_of_week: ["Mon", "Wed", "Fri"],
    //   },
    //   {
    //     room_id: room2._id,
    //     start_time: "18:00:00",
    //     end_time: "22:00:00",
    //     days_of_week: ["Tue", "Thu", "Sat"],
    //   },
    // ]);

    // Колекція Scenarios
    // const scenario1 = await Scenario.create({
    //   user_id: user1._id,
    //   name: "Ранкове освітлення",
    //   brightness: 75,
    // });

    // const scenario2 = await Scenario.create({
    //   user_id: user1._id,
    //   name: "Нічне освітлення",
    //   brightness: 30,
    // });

    // Колекція ScenarioRooms
    // await ScenarioRoom.insertMany([
    //   { scenario_id: scenario1._id, room_id: room1._id },
    //   { scenario_id: scenario2._id, room_id: room2._id },
    // ]);

    // Колекція Logs
    await Log.insertMany([
      {
        user_id: user1._id,
        room_id: room1._id,
        action: "Увімкнено освітлення",
        timestamp: new Date(),
        timeOn: 3600,
        timeOff: 1800,
        averageLightTime: 2700,
      },
      {
        user_id: user1._id,
        room_id: room2._id,
        action: "Вимкнено освітлення",
        timestamp: new Date(),
        timeOn: 1800,
        timeOff: 3600,
        averageLightTime: 2700,
      },
    ]);

    // Колекція Lights (Освітлення)
    await Light.insertMany([
      {
        roomId: room1._id,
        status: true,
        brightness: 80,
        lastActivated: new Date(),
        schedule: {
          start: new Date("2024-12-14T07:00:00Z"),
          end: new Date("2024-12-14T09:00:00Z"),
        },
        motionDetected: false,
      },
      {
        roomId: room2._id,
        status: false,
        brightness: 50,
        lastActivated: new Date(),
        schedule: {
          start: new Date("2024-12-14T18:00:00Z"),
          end: new Date("2024-12-14T22:00:00Z"),
        },
        motionDetected: true,
      },
    ]);

    console.log("Дані успішно додано!");
    process.exit(0);
  } catch (err) {
    console.error("Помилка під час заповнення даних:", err);
    process.exit(1);
  }
}

seedData();

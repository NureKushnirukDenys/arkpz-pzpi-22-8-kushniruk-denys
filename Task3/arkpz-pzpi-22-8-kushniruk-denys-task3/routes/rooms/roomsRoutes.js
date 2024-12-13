const express = require("express");
const router = express.Router();
const Room = require("../../models/Room");

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Управління кімнатами
 */

/**
 * @swagger
 * /rooms/create:
 *   post:
 *     summary: Створити нову кімнату
 *     description: Створення нової кімнати в системі.
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Ідентифікатор користувача.
 *                 example: "60d0fe4f5311236168a109ca"
 *               name:
 *                 type: string
 *                 description: Назва кімнати.
 *                 example: "Кімната 1"
 *     responses:
 *       200:
 *         description: Кімната успішно створена.
 */
router.post("/create", async (req, res) => {
  try {
    const { user_id, name } = req.body;

    // Перевірка наявності user_id та name
    if (!user_id || !name) {
      return res
        .status(400)
        .json({ message: "user_id та name є обов'язковими" });
    }

    // Створення нової кімнати
    const newRoom = new Room({
      user_id,
      name,
    });

    // Збереження кімнати в базі даних
    await newRoom.save();

    res
      .status(200)
      .json({ message: "Кімната успішно створена", room: newRoom });
  } catch (error) {
    res.status(500).send("Серверна помилка");
  }
});

/**
 * @swagger
 * /rooms/info/{roomId}:
 *   get:
 *     summary: Отримати інформацію про кімнату
 *     description: Отримання інформації про кімнату за її ID.
 *     tags: [Rooms]
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         description: ID кімнати.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Інформація про кімнату успішно отримана.
 *       404:
 *         description: Кімната не знайдена.
 */
router.get("/info/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);

    if (!room) {
      return res.status(404).send("Кімната не знайдена.");
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).send("Серверна помилка");
  }
});

/**
 * @swagger
 * /rooms/update/{roomId}:
 *   put:
 *     summary: Оновити інформацію про кімнату
 *     description: Оновлення даних кімнати.
 *     tags: [Rooms]
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         description: ID кімнати.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Ідентифікатор користувача.
 *                 example: "60d0fe4f5311236168a109ca"
 *               name:
 *                 type: string
 *                 description: Назва кімнати.
 *                 example: "Кімната 2"
 *     responses:
 *       200:
 *         description: Кімната успішно оновлена.
 *       404:
 *         description: Кімната не знайдена.
 */
router.put("/update/:roomId", async (req, res) => {
  try {
    const { user_id, name } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { user_id, name },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).send("Кімната не знайдена.");
    }

    res
      .status(200)
      .json({ message: "Кімната успішно оновлена", room: updatedRoom });
  } catch (error) {
    res.status(500).send("Серверна помилка");
  }
});

/**
 * @swagger
 * /rooms/updateStatus/{roomId}:
 *   patch:
 *     summary: Оновити статус кімнати
 *     description: Оновлення статусу кімнати (увімкнено/вимкнено світло).
 *     tags: [Rooms]
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         description: ID кімнати.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: Статус кімнати (увімкнено/вимкнено світло).
 *                 example: true
 *     responses:
 *       200:
 *         description: Статус кімнати успішно оновлено.
 *       404:
 *         description: Кімната не знайдена.
 */
router.patch("/updateStatus/:roomId", async (req, res) => {
  try {
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({ message: "Поле status має бути булевим" });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { status },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).send("Кімната не знайдена.");
    }

    res
      .status(200)
      .json({ message: "Статус кімнати успішно оновлено", room: updatedRoom });
  } catch (error) {
    res.status(500).send("Серверна помилка");
  }
});

module.exports = router;

/**
 * @swagger
 * /rooms/delete/{roomId}:
 *   delete:
 *     summary: Видалити кімнату
 *     description: Видалення кімнати з системи.
 *     tags: [Rooms]
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         description: ID кімнати.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Кімната успішно видалена.
 *       404:
 *         description: Кімната не знайдена.
 */
router.delete("/delete/:roomId", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);

    if (!deletedRoom) {
      return res.status(404).send("Кімната не знайдена.");
    }

    res.status(200).json({ message: "Кімната успішно видалена" });
  } catch (error) {
    res.status(500).send("Серверна помилка");
  }
});

module.exports = router;

const { pool } = require("../config/db");
const getAllMembers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM miembros");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const newSoliMembers = async (req, res) => {
  try {
    const { name, lastName, address, email, dni, numberPhone } = req.body;

    // Confirm data
    if (!name || !lastName || !address || !email || !dni || !numberPhone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and store the new user
    const [result] = await pool.query(
      "INSERT INTO solicitudes (name, lastName, address, email, dni, numberPhone) VALUES (?, ?, ?, ?, ?, ?)",
      [name, lastName, address, email, dni, numberPhone]
    );

    if (result) {
      // Created
      return res.status(201).json({ message: "New member created" });
    } else {
      return res.status(400).json({ message: "Invalid member data received" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const registerMember = async (req, res) => {
  try {
    const { name, lastName, address, email, dni, numberPhone } = req.body;

    // const image = req.file?.filename;
    // const imageUrl = req.file?.path;

    // Confirm data
    if (!name || !lastName || !address || !email || !dni || !numberPhone) {
      // if (imageUrl) {
      //   // Eliminar la imagen del servidor
      //   fs.unlink(imageUrl, (err) => {
      //     if (err) console.error(err);
      //   });
      // }
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate member
    const [rows] = await pool.query(
      "SELECT id FROM miembros WHERE name = ? OR numberPhone = ? OR email= ?",
      [name, numberPhone, email]
    );
    if (rows.length > 0) {
      return res.status(409).json({ message: "There is a duplicate field" });
    }

    // Create and store the new user
    const [result] = await pool.query(
      "INSERT INTO miembros (name, lastName, address, email, dni, numberPhone) VALUES (?, ?, ?, ?, ?, ?)",
      [name, lastName, address, email, dni, numberPhone]
    );

    if (result) {
      // Created
      return res.status(201).json({ message: "New member created" });
    } else {
      return res.status(400).json({ message: "Invalid member data received" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerMember, getAllMembers, newSoliMembers };

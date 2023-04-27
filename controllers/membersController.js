const { pool } = require("../config/db");
const getAllMembers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECTs * FROM users");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const registerMember = async (req, res) => {
  const { name, lastName, dateRegister, phoneNumber, email, imageProfile } =
    req.body;

  // Confirm data
  if (
    !name ||
    !lastName ||
    !dateRegister ||
    !phoneNumber ||
    !email ||
    !imageProfile
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for duplicate member
    const [rows] = await pool.query(
      "SELECT id FROM users WHERE name = ? OR phoneNumber = ? OR email= ?",
      [name, phoneNumber, email]
    );
    if (rows.length > 0) {
      return res.status(409).json({ message: "There is a duplicate field" });
    }

    // Create and store the new user
    const [result] = await pool.query(
      "INSERT INTO users (name, lastName, dateRegister, phoneNumber, email, imageProfile) VALUES (?, ?, ?, ?, ?, ?)",
      [name, lastName, dateRegister, phoneNumber, email, imageProfile]
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
module.exports = { registerMember, getAllMembers };

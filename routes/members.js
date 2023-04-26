const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");

router
  .route("/")
  .get(membersController.getAllMembers) // Obtener miembros
  .post(membersController.registerMember); // Registro de miembros con membresía

module.exports = router;

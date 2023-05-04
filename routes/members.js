const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");
// TODO: Implementar multer para subir imágenes
// const { upload } = require("../config/multer");

router.route("/").get(membersController.getAllMembers); // Obtener miembros

router.route("/solicitud").post(membersController.newSoliMembers); // Registro de miembros con membresía
router.route("/register").post(membersController.registerMember); // Registro de miembros con membresía
module.exports = router;

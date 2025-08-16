const express = require("express");
const router = express.Router();
const { 
  createadmin1, 
  getAllAdmins, 
  updateAdmin, 
  deleteAdmin,
  verifyPasswordToken,
  setNewPassword
} = require("../controllers/utilisateurController");

const verifyToken = require("../middleware/auth"); // middleware JWT

// 📥 GET - Récupérer tous les administrateurs
router.get("/", verifyToken, getAllAdmins);

// ➕ POST - Créer un administrateur
router.post("/", verifyToken, createadmin1);

// 🔁 PUT - Modifier un administrateur
router.put("/:id", verifyToken, updateAdmin);

// ❌ DELETE - Supprimer un administrateur
router.delete("/:id", verifyToken, deleteAdmin);

router.get("/verify-token", verifyPasswordToken);

router.post("/set-password", setNewPassword);


module.exports = router;

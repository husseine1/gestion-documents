const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");


const {
  getAllNormes,
  createNorme,
  updateNorme,
  deleteNorme,
  downloadFile,
  getNormeById,
  setCompteurValidationToOne,
  toggleTelechargement,
  compteur0,
  rejeterNorme ,
  getAllNorme

} = require("../controllers/normesController");

const verifyToken = require("../middleware/auth");

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 📎 GET : Télécharger un fichier
router.get("/download/:filename", verifyToken, downloadFile);

// 📥 GET avec filtres
router.get("/", verifyToken, getAllNormes);
// ➕ Route publique sans verifyToken
router.get("/public", getAllNorme);

router.patch('/rejeter/:id', verifyToken, rejeterNorme);

router.get('/en-attente', compteur0);
// 📥 GET par ID - placer en dernier pour éviter conflit avec download
router.get("/:id", verifyToken, getNormeById);

// ➕ POST : Ajouter une norme avec un fichier
router.post("/", verifyToken, upload.single("fichier"), createNorme);

// 🔁 PUT : Modifier une norme (avec ou sans fichier)
router.put("/:id", verifyToken, upload.single("fichier"), updateNorme);

// ❌ DELETE : Supprimer une norme
router.delete("/:id", verifyToken, deleteNorme);

router.patch("/valider/:id", verifyToken, setCompteurValidationToOne);
router.put("/toggle-telechargement/:id", verifyToken,toggleTelechargement );




module.exports = router;

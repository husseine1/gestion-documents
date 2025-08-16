const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("🔐 Aucun header Authorization ou format incorrect.");
    return res.status(401).json({ message: "Token manquant ou mal formé" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Stockage des infos utilisateur dans la requête
    req.admin = decoded; // Remplacer user par admin si c’est un admin

    console.log("✅ Token JWT vérifié avec succès :", decoded);
    next();
  } catch (error) {
    console.error("❌ Échec de vérification du token :", error.message);
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
}

module.exports = verifyToken;

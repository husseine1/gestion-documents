const bcrypt = require("bcryptjs");
const db = require("./db");

const email = "admin@gmail.com";
const password = "admin";

bcrypt.hash(password, 10).then((hash) => {
  const sql = "INSERT INTO admin (email, password) VALUES (?, ?)";
  db.query(sql, [email, hash], (err, result) => {
    if (err) {
      console.error("Erreur lors de la création de l’admin :", err);
    } else {
      console.log("✅ Admin ajouté avec succès avec l’ID :", result.insertId);
    }
    process.exit(); // ferme le script
  });
});

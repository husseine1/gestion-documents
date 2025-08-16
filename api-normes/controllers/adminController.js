const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = (req, res) => {
  const { email, password} = req.body;
  const sql = "SELECT * FROM admin WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(401).json({ message: "Admin non trouvé" });

    const admin = result[0];
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    // Inclure le rôle dans le token
  const token = jwt.sign(
  { id: admin.id, email: admin.email, role: admin.role },
  process.env.JWT_SECRET,
  { expiresIn: "24h" }
);


res.json({
  token,
  role: admin.role,
  admin: {
    id: admin.id,
    email: admin.email
  }
});
   

  });
};

module.exports = { loginAdmin };

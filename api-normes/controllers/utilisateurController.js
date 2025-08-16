const db = require("../db");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // privilégier bcryptjs si utilisé ailleurs

// Initialiser le transporteur une seule fois
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// ✅ Créer un administrateur
const createadmin1 = async (req, res) => {
  const {
    civilite,
    nom,
    prenoms,
    pays,
    role,
    fonction,
    whatsapp,
    email
  } = req.body;

  const sql = `
    INSERT INTO admin 
    (civilite, nom, prenoms, pays, role, fonction, whatsapp, email) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [civilite, nom, prenoms, pays, role, fonction, whatsapp, email], async (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    try {
      // Générer un token JWT
      const payload = { email };
      const secret = process.env.JWT_SECRET || "secretTemporaire123";
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      // Lien de création de mot de passe
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";
      const createPasswordLink = `${frontendUrl}/creer-mot-de-passe?token=${token}`;

      const mailOptions = {
        from: '"Portail des normes" <no-reply@normes.africa>',
        to: email,
        subject: "Bienvenue sur le Portail des normes – Créez votre mot de passe",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h3>Bonjour ${civilite} ${nom},</h3>
            <p>Votre compte administrateur a été créé avec succès.</p>
            <p>Pour finaliser votre inscription, veuillez créer votre mot de passe :</p>
            <p>
              <a href="${createPasswordLink}" style="display: inline-block; padding: 10px 20px; background-color: #1a73e8; color: white; text-decoration: none; border-radius: 5px;">
                Créer mon mot de passe
              </a>
            </p>
            <p>Ce lien expirera dans <strong>1 heure</strong>.</p>
            <p>Si vous n’êtes pas à l’origine de cette inscription, ignorez simplement ce message.</p>
            <br>
            <p>Merci,<br>L’équipe Archivistes Leaders</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("📩 Mail envoyé à", email);

      res.status(201).json({ message: "Administrateur créé avec succès. Email envoyé." });

    } catch (mailErr) {
      console.error("Erreur lors de l'envoi d'email :", mailErr);
      return res.status(500).json({ message: "Administrateur créé mais erreur lors de l'envoi de l'email." });
    }
  });
};

// 📥 Récupérer tous les administrateurs
const getAllAdmins = (req, res) => {
  const sql = "SELECT * FROM admin ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// 🔁 Mettre à jour un administrateur
const updateAdmin = (req, res) => {
  const { id } = req.params;
  const {
    civilite, nom, prenoms, pays,
    role, fonction, whatsapp, email
  } = req.body;

  const sql = `
    UPDATE admin SET
      civilite = ?, nom = ?, prenoms = ?, pays = ?,
      role = ?, fonction = ?, whatsapp = ?, email = ?
    WHERE id = ?
  `;
  const values = [
    civilite, nom, prenoms, pays,
    role, fonction, whatsapp, email,
    id
  ];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Administrateur mis à jour avec succès" });
  });
};

// ❌ Supprimer un administrateur
const deleteAdmin = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM admin WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Administrateur supprimé avec succès" });
  });
};

const verifyPasswordToken = (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ email: decoded.email });
  } catch (err) {
    res.status(401).json({ message: "Lien expiré ou invalide." });
  }
};

const setNewPassword = async (req, res) => {
  const { token, password } = req.body;

  console.log("Token reçu:", token);
  console.log("Mot de passe reçu:", password);

  if (!token || !password) {
    return res.status(400).json({ message: "Token ou mot de passe manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Décodage JWT réussi. Email:", decoded.email);

    const hashed = await bcrypt.hash(password, 10);

    const sql = `UPDATE admin SET password = ? WHERE email = ?`;

    db.query(sql, [hashed, decoded.email], (err) => {
      if (err) {
        console.error("Erreur DB:", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }
      res.json({ message: "Mot de passe mis à jour avec succès." });
    });
  } catch (err) {
    console.error("Erreur de vérification du token:", err.message);
    res.status(400).json({ message: "Token expiré ou invalide." });
  }
};

module.exports = {
  createadmin1,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  verifyPasswordToken,
  setNewPassword
};

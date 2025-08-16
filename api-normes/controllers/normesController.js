 const db = require("../db");
const path = require("path");
const nodemailer = require('nodemailer');



const getAllNormes = (req, res) => {
  const { search, typeTexte, domaineActivite, paysRegion, applyFilters } = req.query;
  const adminId = req.admin?.id;
  const role = req.admin?.role;

  if (!adminId || !role) {
    return res.status(401).json({ error: "Admin non authentifié" });
  }

 let sql = "SELECT * FROM normes WHERE 1";  // on récupère toutes les normes, sans filtrage compteur_validation

  const params = [];

  // 🌍 Pour les rôles autres que Super Admin
  if (role !== "Super Administrateur") {
    sql += " AND admin_id = ?";
    params.push(adminId);
  }

  // 🔍 Recherche générale (titre, description, domaine, source, etc.)
  if (search) {
    sql += ` AND (
      domaine LIKE ? OR
      categorie LIKE ? OR
      description_du_texte LIKE ? OR
      source LIKE ?
    )`;
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  // ✅ Appliquer filtres avancés
  if (applyFilters == 1) {
    if (typeTexte) {
      sql += " AND categorie = ?";
      params.push(typeTexte);
    }
    if (domaineActivite) {
      sql += " AND domaine_activite LIKE ?";
      params.push(`%${domaineActivite}%`);
    }
    if (paysRegion) {
      sql += " AND pays_ou_region LIKE ?";
      params.push(`%${paysRegion}%`);
    }
  }
    console.log("📄 SQL :", sql);
  console.log("🔢 Params :", params);

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};


const getAllNorme = (req, res) => {
  const { search, typeTexte, domaineActivite, paysRegion, applyFilters } = req.query;

  let sql = "SELECT * FROM normes WHERE 1";  // récupère toutes les normes
  const params = [];

  // 🔍 Recherche générale (titre, description, domaine, source, etc.)
  if (search) {
    sql += ` AND (
      domaine LIKE ? OR
      categorie LIKE ? OR
      description_du_texte LIKE ? OR
      source LIKE ?
    )`;
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  // ✅ Appliquer filtres avancés
  if (applyFilters == 1) {
    if (typeTexte) {
      sql += " AND categorie = ?";
      params.push(typeTexte);
    }
    if (domaineActivite) {
      sql += " AND domaine_activite LIKE ?";
      params.push(`%${domaineActivite}%`);
    }
    if (paysRegion) {
      sql += " AND pays_ou_region LIKE ?";
      params.push(`%${paysRegion}%`);
    }
  }

  console.log("📄 SQL :", sql);
  console.log("🔢 Params :", params);

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};




// POST - Créer une norme
const createNorme = (req, res) => {
  const {
    domaine,
    categorie,
    description_du_texte,
    source,
    reference_du_texte,
    document_concerne,
    domaine_activite,
    date_pub,
    pays_ou_region,
  } = req.body;
  const fichier = req.file ? req.file.filename : null;

  const adminId = req.admin?.id; // ✅ récupéré du token

  if (!adminId) {
    return res.status(401).json({ error: "Admin non authentifié" });
  }

  const sql = `
    INSERT INTO normes (
      domaine, categorie, description_du_texte, source,
      reference_du_texte, document_concerne, domaine_activite,
      date_pub, pays_ou_region, fichier, admin_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    domaine, categorie, description_du_texte, source,
    reference_du_texte, document_concerne, domaine_activite,
    date_pub, pays_ou_region, fichier, adminId
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Norme créée avec succès", id: result.insertId });
  });
};


// PUT - Modifier une norme
const updateNorme = (req, res) => {
  const { id } = req.params;
  const {
    domaine, categorie, description_du_texte, source,
    reference_du_texte, document_concerne, domaine_activite,
    date_pub, pays_ou_region
  } = req.body;
  const fichier = req.file ? req.file.filename : null;

  let sql = `
    UPDATE normes SET
      domaine = ?, categorie = ?, description_du_texte = ?, source = ?,
      reference_du_texte = ?, document_concerne = ?, domaine_activite = ?,
      date_pub = ?, pays_ou_region = ?
  `;
  const values = [
    domaine, categorie, description_du_texte, source,
    reference_du_texte, document_concerne, domaine_activite,
    date_pub, pays_ou_region
  ];
  if (fichier) {
    sql += ", fichier = ?";
    values.push(fichier);
  }
  sql += " WHERE id = ?";
  values.push(id);

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Norme mise à jour avec succès" });
  });
};

// DELETE - Supprimer une norme
const deleteNorme = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM normes WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Norme supprimée" });
  });
};

// GET - Télécharger un fichier
const downloadFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);
  res.download(filePath, filename, (err) => {
    if (err) res.status(404).json({ error: "Fichier introuvable" });
  });
};



// POST - Créer une norme
const createadmin = (req, res) => {
  const {
    civilite,
    nom,
    prenoms,
    pays,
    type_utilisateur,
    fonction,
    whatsapp,
    email,
    
  } = req.body;
  

  const sql = `
    INSERT INTO admin (
      civilite, nom, prenoms, pays,
       type_utilisateur, fonction, whatsapp,
      email
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    civilite, nom, prenoms, pays,
     type_utilisateur, fonction, whatsapp,
    email, 
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "admin créée avec succès", id: result.insertId });
  });


  
};

const getNormeById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM normes WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Norme non trouvée" });
    res.json(results[0]);
  });
};

  const setCompteurValidationToOne = (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE normes SET compteur_validation = IF(compteur_validation = 0, 1, compteur_validation) WHERE id = ?`;


  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du compteur :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Déjà validé ou introuvable" });
    }

    res.status(200).json({ message: "Compteur mis à 1" });
  });
};

const toggleTelechargement = (req, res) => {
  const { id } = req.params;
  // Basculer la valeur de telechargement : si 1 -> 0, si 0 -> 1
  const sql = `UPDATE normes SET telechargement = 1 - telechargement WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erreur telechargement :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.status(200).json({ message: "Téléchargement basculé" });
  });
};




const compteur0 = (req, res) => {
  const sql = "SELECT * FROM normes WHERE compteur_validation = 0";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur récupération normes compteur_validation=0 :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.json(result);
  });
};

const rejeterNorme = (req, res) => {
  const { id } = req.params;
  const { raison_rejet } = req.body;

  if (!raison_rejet || raison_rejet.trim() === "") {
    return res.status(400).json({ message: "La raison du rejet est obligatoire." });
  }

  const normeId = parseInt(id, 10);
  if (isNaN(normeId)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  const sql = `
    UPDATE normes
    SET status = 'rejetee',
        raison_rejet = ?,
        compteur_validation = 2
    WHERE id = ?
  `;

  db.query(sql, [raison_rejet, normeId], (err, result) => {
    if (err) {
      console.error("Erreur lors du rejet de la norme :", err);
      return res.status(500).json({ message: "Erreur serveur lors du rejet" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Norme non trouvée" });
    }

    // Config Nodemailer avec Mailtrap SMTP
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: '"Normes Admin" <admin@normes.com>',
      to: "destinataire@example.com", // Mets ici l'email du destinataire (admin, auteur norme...)
      subject: `Norme rejetée - ID ${normeId}`,
      text: `La norme avec l'ID ${normeId} a été rejetée.\nMotif : ${raison_rejet}`
    };

    transporter.sendMail(mailOptions, (mailErr, info) => {
      if (mailErr) {
        console.error("Erreur envoi mail :", mailErr);
        // On peut répondre quand même succès même si mail fail
      } else {
        console.log("Mail envoyé via Mailtrap :", info.response);
      }
    });

    res.status(200).json({ message: "Norme rejetée avec succès" });
  });
};




module.exports = {
  getAllNormes,
  createNorme,
  updateNorme,
  deleteNorme,
  downloadFile,
  createadmin,
  getNormeById,
  setCompteurValidationToOne,
  toggleTelechargement,
  compteur0,
  rejeterNorme,
  getAllNorme
};

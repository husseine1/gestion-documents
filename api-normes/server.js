const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const normesRoutes = require("./routes/normes");
const adminRoutes = require("./routes/admin");
const adminRoute = require("./routes/utilisateurs");
const normesRoute = require("./routes/normes");




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/normes", normesRoutes);
app.use("/api/public", normesRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/utilisateurs", adminRoute);
app.use('/uploads', express.static('uploads'));




//app.put("/api/normes/:id", (req, res) => {
  //const { id } = req.params;
 // const { telechargement } = req.body;
 // db.query("UPDATE normes SET telechargement = ? WHERE id = ?", [telechargement, id], (err, result) => {
   // if (err) {
   //   console.error(err);
  //    return res.status(500).json({ message: "Erreur serveur" });
   // }
  //  res.json({ message: "Téléchargement mis à jour" });
 // });
//});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`✅ Serveur lancé sur le port ${PORT}`);

});

import { useState, useRef } from "react";
import api from "../utils/api";
import NavMenu from "./NavMenu";
import axios from "axios";
import Footer from "./Footer";


export default function AjouterNorme() {
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const [form, setForm] = useState({
    domaine: "",
    categorie: "",
    description_du_texte: "",
    source: "",
    reference_du_texte: "",
    document_concerne: "",
    domaine_activite: "",
    date_pub: "",
    pays_ou_region: "",
    fichier: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fichier") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Vous devez être connecté pour ajouter une norme !");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:3000/api/normes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Message de succès centré
      setSuccessMessage("✅ Norme ajoutée avec succès !");
      setVisible(true);

      // Réinitialisation du formulaire
      setForm({
        domaine: "",
        categorie: "",
        description_du_texte: "",
        source: "",
        reference_du_texte: "",
        document_concerne: "",
        domaine_activite: "",
        date_pub: "",
        pays_ou_region: "",
        fichier: null,
      });

      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setSuccessMessage(""), 500);
      }, 3000);

    } catch (err) {
      console.error("❌ Erreur lors de l’ajout :", err);
      alert("❌ Erreur lors de l’ajout de la norme.");
    }
  };

  return (
    <>
      {/* ✅ Message centré */}
      {successMessage && (
        <div
          className={`fade-message ${visible ? "visible" : "hidden"}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 10000,
            transition: "opacity 0.5s ease",
            opacity: visible ? 1 : 0,
          }}
        >
          <div
            className="alert alert-success text-center"
            style={{ minWidth: "300px", fontSize: "1.2rem" }}
          >
            {successMessage}
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand">
            <img
              src="logo.jpeg"
              alt="Logo Topic"
              style={{ height: "90px", width: "auto" }}
            />
          </a>

          <NavMenu />

          <div className="ms-auto">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle fw-bold fs-5"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi-person-circle me-2"></i>Compte
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                <li>
                  <button
                    className="dropdown-item text-danger"
                                      onClick={() => {
                      if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }
                    }}

                  >
                    🔒 Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>


       <div className="featured-section"><h2 className="text-center" style={{ color: 'yellow' }}>➕ Charger un texte</h2></div>
       
    <section className="featured-section py-5">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "700px" }}>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg"
                style={{ fontSize: "1.2rem", height: "50px" }}
                name="domaine"
                placeholder="Domaine"
                value={form.domaine}
                onChange={handleChange}
                required
              />
            </div>


              <div className="col-md-6">
                <select
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="categorie"
                  value={form.categorie}
                  onChange={handleChange}
                  required
                >
                  <option value="">Type de texte</option>
                  <option value="code">code</option>
                  <option value="lois">lois</option>
                  <option value="règlement">règlement</option>
                  <option value="circulaire">circulaire</option>
                  <option value="ordonnance">ordonnance</option>
                  <option value="décret">décret</option>
                  <option value="arrêté">arrêté</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="col-12">
              <textarea
                className="form-control form-control-lg"
                style={{ fontSize: "1.1rem", minHeight: "120px", padding: "12px" }}
                name="description_du_texte"
                placeholder="Description du texte"
                rows="5"
                value={form.description_du_texte}
                onChange={handleChange}
              ></textarea>
            </div>


              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="source"
                  placeholder="Source"
                  value={form.source}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="reference_du_texte"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  placeholder="Référence du texte"
                  value={form.reference_du_texte}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                 style={{ fontSize: "1.2rem", height: "50px" }}
                  name="document_concerne"
                  placeholder="Document concernés"
                  value={form.document_concerne}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="domaine_activite"
                  placeholder="Domaine d'activité"
                  value={form.domaine_activite}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="date_pub"
                  placeholder="Validité du texte"
                  value={form.date_pub}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 col-12">
                <select
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="pays_ou_region"
                  value={form.pays_ou_region}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pays ou Région</option>
                  <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
                  <option value="CAMEROUN">CAMEROUN</option>
                  <option value="BENIN">BENIN</option>
                  <option value="GABON">GABON</option>
                </select>
              </div>

              <div className="col-md-12">
                <input
                  type="file"
                  className="form-control"
         
                  name="fichier"
                  id="fichier"
                  onChange={handleChange}
                  required
                  ref={fileInputRef}
                />
              </div>

            
                <button className="btn btn-primary" type="submit"  style={{ fontSize: "1.2rem", height: "50px" }}>
                  Ajouter
                </button>
             
            </form>
          </div>
        </div>
      </section>
      
     
      
      <Footer/>
    </>
  );
}

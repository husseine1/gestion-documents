import NavMenu from "./NavMenu";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Footer from "./Footer";

export default function ModifierNorme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    description_du_texte: "",
    reference_du_texte: "",
    document_concerne: "",
    domaine: "",
    categorie: "",
    domaine_activite: "",
    pays_ou_region: "",
    source: "",
    date_pub: "",
    fichier: null,
  });

  useEffect(() => {
    fetchNorme();
  }, []);

  const fetchNorme = async () => {
    try {
      const res = await api.get(`/normes/${id}`);
      setForm({ ...res.data, fichier: null }); // on met fichier à null
    } catch (err) {
      console.error("Erreur de chargement :", err);
      alert("Erreur lors du chargement de la norme");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fichier") {
      setForm((prev) => ({ ...prev, fichier: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Veuillez vous connecter.");
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      await api.put(`/normes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Norme modifiée avec succès !");
      navigate("/valider-norme");
    } catch (err) {
      console.error("Erreur modification :", err);
      alert("❌ Échec de la modification");
    }
  };


  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
         <a className="navbar-brand" >
              <img 
              src="logo.jpeg" 
                alt="Logo Topic" 
                style={{ height: '90px', width: 'auto' }} 
               />
          
             </a>

                 {/* NavMenu filtré selon le rôle */}
                                       <NavMenu />

          <div className="ms-auto">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
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
                      localStorage.removeItem("token");
                      window.location.href = "/login";
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

       <div className="featured-section"><h2 className="text-center" style={{ color: 'yellow' }}>✏️ Modifier la norme</h2></div>
       
      <section className="featured-section  py-5">
       
        <div className="container ">
          <div className="mx-auto" style={{ maxWidth: "700px" }}>
            
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
                  name="description_du_texte"
                  placeholder="Description du texte"
                  rows="2"
                  value={form.description_du_texte}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
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
                  placeholder="Référence du texte"
                  value={form.reference_du_texte}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
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
                  name="domaine_activite"
                  placeholder="Domaine d'activité"
                  value={form.domaine_activite}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="date_pub" className="form-label">
                  Validité du texte
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="date_pub"
                  value={form.date_pub}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 col-12">
                <select
                  className="form-control"
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

              <div className="col-md-6">
                <label htmlFor="fichier" className="form-label">
                  Joindre un fichier
                </label>
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

              <div className="col-12 d-flex gap-2">
                       <button className="btn btn-primary" type="submit">
          💾 Enregistrer
        </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      
     
      
      {/* Footer */}
    <Footer/>
    </>
  );
}

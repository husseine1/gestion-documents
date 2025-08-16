
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import Footer from "./Footer";
import NavMenu from "./NavMenu";

export default function ModifierAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    civilite: "",
    nom: "",
    prenoms: "",
    pays: "",
    type_utilisateur: "",
    fonction: "",
    whatsapp: "",
    email: "",
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get(`/utilisateurs`);
        const admin = res.data.find((a) => a.id == id);
        if (admin) setFormData(admin);
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/utilisateurs/${id}`, formData);
      alert("✅ Admin modifié avec succès !");
      navigate("/Liste-admin");
    } catch (err) {
      console.error("Erreur de modification :", err);
      alert("❌ Échec de la modification");
    }
  };

  return (
    <>
      {/* NAVBAR (inchangée, juste reformatée) */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <img src="logo.jpeg" alt="Logo Topic" style={{ height: 90 }} />
          </Link>

                {/* NavMenu filtré selon le rôle */}
                                      <NavMenu />

          <div className="ms-auto dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="bi-person-circle me-2"></i>Compte
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
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
      </nav>

      <div className="featured-section">
        <h2 className="text-center" style={{ color: 'yellow' }}>✏️ Modifier un administrateur</h2>
      </div>

      <section className="featured-section bg py-5">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "700px" }}>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <select
                  className="form-control"
                  name="civilite"
                  value={formData.civilite}
                  onChange={handleChange}
                  required
                >
                  <option value="">Civilité</option>
                  <option value="M.">M.</option>
                  <option value="Mme">Mme</option>
                  <option value="Mlle">Mlle</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="prenoms"
                  placeholder="Prénoms"
                  value={formData.prenoms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-control"
                  name="pays"
                  value={formData.pays}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pays</option>
                  <option value="CAMEROUN">CAMEROUN</option>
                  <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
                  <option value="BENIN">BENIN</option>
                  <option value="GABON">GABON</option>
                </select>
              </div>

              <div className="col-md-6">
                <select
                  className="form-control"
                  name="type_utilisateur"
                  value={formData.type_utilisateur}
                  onChange={handleChange}
                  required
                >
                  <option value="">Type d'utilisateur</option>
                  <option value="Utilisateur inscrit">Utilisateur inscrit</option>
                  <option value="Administrateur pays">Administrateur pays</option>
                  <option value="Super Administrateur">Super Administrateur</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="fonction"
                  placeholder="Fonction"
                  value={formData.fonction}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="tel"
                  className="form-control"
                  name="whatsapp"
                  placeholder="Numéro WhatsApp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-success" type="submit">
                  💾 Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Footer inchangé */}
<Footer/>
      {/* … */}
    </>
  );
}

import { useState } from "react";
import api from "../utils/api";
import NavMenu from "./NavMenu"; 
import Footer from "./Footer";

export default function CreAdmin() {
 const [form, setForm] = useState({
  civilite: "",
  nom: "",
  prenoms: "",
  pays: "",
  role: "",
  fonction: "",
  whatsapp: "",
  email: "",
 
});



const [loading, setLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await api.post("/utilisateurs", form);
    setSuccessMessage("✅ Administrateur créé avec succès !");
    setForm({
      civilite: "",
      nom: "",
      prenoms: "",
      pays: "",
      role: "",
      fonction: "",
      whatsapp: "",
      email: "",
      mot_de_passe: "",
    });

    // Efface le message après 3 secondes
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (err) {
    console.error("❌ Erreur lors de la création :", err);
    alert("Erreur lors de la création de l'administrateur");
  } finally {
    setLoading(false);
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

     {loading && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <div className="text-center">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: '4rem', height: '4rem' }}
      ></div>
      <div className="mt-3">Création de l’administrateur...</div>
    </div>
  </div>
)}
  
 {successMessage && (
  <div className="alert alert-success text-center" role="alert">
    {successMessage}
  </div>
)}
 


    <div className="featured-section"><h2 className="text-center" style={{ color: 'yellow' }}>👤 Créer un administrateur</h2></div>
      <section className="featured-section bg py-5">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "700px" }}>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <select
                  className="form-control"
                  name="civilite"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  value={form.civilite}
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
                  style={{ fontSize: "1.2rem", height: "50px" }}
                  name="nom"
                  placeholder="Nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="prenoms"
                  placeholder="Prénoms"
                  value={form.prenoms}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div className="col-md-6">
                <select
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="pays"
                  value={form.pays}
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
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Type d'utilisateur</option>
                  <option value="Administrateur">Administrateur pays</option>
                  <option value="Super Administrateur">Super Administrateur</option>
                </select>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="fonction"
                  placeholder="Fonction"
                  value={form.fonction}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="tel"
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="whatsapp"
                  placeholder="Numéro WhatsApp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                   style={{ fontSize: "1.2rem", height: "50px" }}
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
                             

                
               <button  style={{ fontSize: "1.2rem", height: "50px" }} className="btn btn-primary" type="submit" disabled={loading}>
                
                        Ajouter
                      </button>

            </form>
          </div>
        </div>
      </section>

     
      
      {/* Footer */}
 <Footer/>
    </>
  );
}

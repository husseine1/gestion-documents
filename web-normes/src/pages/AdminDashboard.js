import { useEffect, useState } from "react";
import api from "../utils/api";
import NavMenu from "./NavMenu";
import Footer from "./Footer";
import axios from "axios";
import Pagination from "./Pagination";


export default function AdminDashboard() {
  const [normes, setNormes] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
const [selectedRaison, setSelectedRaison] = useState("");


  useEffect(() => {
    fetchNormes();
  }, []);

  const fetchNormes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/normes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNormes(res.data);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des normes :", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette norme ?")) return;
    try {
      await api.delete(`/normes/${id}`);
      fetchNormes();
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Échec de suppression");
    }
  };

  const toggleTelechargement = async (id, currentState) => {
    try {
      await api.put(`/normes/toggle-telechargement/${id}`, {
        telechargement: !currentState,
      });
      fetchNormes();
    } catch (err) {
      console.error("Erreur toggle:", err);
    }
  };

const filteredNormes = normes
  // Filtrer selon rôle
  .filter(n => {
    if (role === "Super Administrateur") {
      return Number(n.compteur_validation) === 1; // que validées
    }
    return true; // autres rôles, toutes les normes
  })
  // puis appliquer la recherche
  .filter(
    (n) =>
      n.domaine?.toLowerCase().includes(search.toLowerCase()) ||
      n.categorie?.toLowerCase().includes(search.toLowerCase()) ||
      n.description_du_texte?.toLowerCase().includes(search.toLowerCase()) ||
      n.source?.includes(search)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNormes = filteredNormes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand">
            <img src="logo.jpeg" alt="Logo Topic" style={{ height: "90px", width: "auto" }} />
          </a>
          <NavMenu />
          <div className="ms-auto d-flex align-items-center gap-3">
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
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
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

      {/* TABLEAU */}
      <section className="featured-section">
        <div className="container ">
          <h2 className="mb-4" style={{ color: 'yellow', textAlign: 'center' }}>📋 Liste des textes et lois</h2>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="🔍 Rechercher par titre, catégorie, mots-clés ou date"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Description du texte</th>
                  <th>Référence du texte</th>
                  <th>Documents concernés</th>
                  <th>Domaines</th>
                  <th>Type de texte</th>
                  <th>Domaine d'activité</th>
                  <th>Pays ou Région</th>
                  <th>Source</th>
                  <th>Fichier</th>
                  <th>Validité du texte</th>
                  <th>{role === "Administrateur" ? "État du document" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {currentNormes.map((n) => (
                  <tr key={n.id}>
                    <td>{n.description_du_texte}</td>
                    <td>{n.reference_du_texte}</td>
                    <td>{n.document_concerne}</td>
                    <td>{n.domaine}</td>
                    <td>{n.categorie}</td>
                    <td>{n.domaine_activite}</td>
                    <td>{n.pays_ou_region}</td>
                    <td>{n.source}</td>
                    <td>{n.fichier}</td>
                    <td>{n.date_pub}</td>
   <td>
  {role === "Administrateur" ? (
    <div className="d-flex align-items-center gap-2">
      {(() => {
        const compteur = Number(n.compteur_validation);
        console.log("compteur_validation:", compteur, "status:", n.status);
if (Number(n.compteur_validation) === 1) {
  // ✅ Si compteur == 1 → Validée
  return <span className="badge bg-success">✅ Validée</span>;
} 
else if (Number(n.compteur_validation) === 0) {
  // ⏳ Si compteur == 0 → En attente
  return <span className="badge bg-warning text-dark">⏳ En attente</span>;
} 
else if (n.status?.toLowerCase() === "rejetee") {
  // ❌ Si rejetée → badge + bouton raison
  return (
    <>
      <span className="badge bg-danger">❌ Rejetée</span>
      {n.raison_rejet && (
        <button
          className="btn btn-sm btn-outline-info"
          title="Voir la raison du rejet"
          onClick={() => {
            setSelectedRaison(n.raison_rejet);
            setShowModal(true);
          }}
        >
          ℹ️
        </button>
      )}
    </>
  );
}

        return <span className="badge bg-secondary">Statut inconnu</span>;
      })()}
    </div>
  ) : (
    // partie non admin inchangée
    <div className="d-flex flex-wrap gap-2">
      {n.telechargement ? (
        <button
          className="btn btn-sm btn-warning"
          onClick={() => toggleTelechargement(n.id, n.telechargement)}
          title="Désactiver le téléchargement"
        >
          🚫 Désactiver
        </button>
      ) : (
        <button
          className="btn btn-sm btn-success"
          onClick={() => toggleTelechargement(n.id, n.telechargement)}
          title="Activer le téléchargement"
        >
          📥 Activer
        </button>
      )}

      <button
        className="btn btn-sm btn-danger"
        onClick={() => handleDelete(n.id)}
        title="Supprimer"
      >
        🗑️ Supprimer
      </button>
    </div>
  )}
</td>

                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <Pagination
            totalItems={filteredNormes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>

     <Footer/>

      {/* Modale pour la raison du rejet */}
<div
  className={`modal fade ${showModal ? "show d-block" : ""}`}
  tabIndex="-1"
  role="dialog"
  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Raison du rejet</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowModal(false)}
        ></button>
      </div>
      <div className="modal-body">
        <p>{selectedRaison}</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowModal(false)}
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

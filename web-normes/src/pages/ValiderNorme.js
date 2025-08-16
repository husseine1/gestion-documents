import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import Footer from "./Footer";

export default function ValiderNorme() {
  const [normes, setNormes] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  // États pour la modale de rejet
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectMotif, setRejectMotif] = useState("");
  const [rejectNormeId, setRejectNormeId] = useState(null);

  // Empêche le scroll du body quand modale ouverte
  useEffect(() => {
    if (showRejectModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showRejectModal]);

  const fetchNormes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/normes/en-attente", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNormes(res.data);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des normes en attente :", err);
    }
  };

  useEffect(() => {
    fetchNormes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Rejeter cette norme ?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/normes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNormes();
    } catch (err) {
      console.error("Erreur Rejeter :", err);
      alert("Échec de Rejeter");
    }
  };

  const handleValidate = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`http://localhost:3000/api/normes/valider/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNormes();
    } catch (err) {
      console.error("Erreur validation :", err);
      alert("Erreur lors de la validation");
    }
  };

  const handleEdit = (norme) => {
    navigate(`/modifier-norme/${norme.id}`);
  };

  // Ouvre la modale de rejet avec ID de la norme ciblée
  const openRejectModal = (id) => {
    setRejectNormeId(id);
    setRejectMotif("");
    setShowRejectModal(true);
  };

  // Ferme la modale si clic en dehors de la boîte
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      setShowRejectModal(false);
    }
  };

  // Envoie la raison du rejet au backend et actualise la liste
const handleReject = async () => {
  if (!rejectMotif.trim()) {
    alert("Veuillez saisir un motif de rejet.");
    return;
  }
  const token = localStorage.getItem("token");
  try {
    // 1. Mise à jour du motif de rejet
    await axios.patch(
      `http://localhost:3000/api/normes/rejeter/${rejectNormeId}`,
      { raison_rejet: rejectMotif },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 2. Suppression de la norme rejetée
    await axios.delete(
      `http://localhost:3000/api/normes/${rejectNormeId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setShowRejectModal(false);
    fetchNormes(); // rafraîchir la liste
  } catch (err) {
    console.error("Erreur lors du rejet :", err);
    alert("Erreur lors du rejet, veuillez réessayer.");
  }
};


  const filteredNormes = normes.filter((n) => {
    if (!search) return true;
    return (
      n.domaine?.toLowerCase().includes(search.toLowerCase()) ||
      n.categorie?.toLowerCase().includes(search.toLowerCase()) ||
      n.description_du_texte?.toLowerCase().includes(search.toLowerCase()) ||
      n.source?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredNormes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNormes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand">
            <img src="logo.jpeg" alt="Logo Topic" style={{ height: "90px", width: "auto" }} />
          </a>
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
        <div className="container">
         <h2 className="mb-4" style={{ color: 'yellow', textAlign: 'center' }}> ✔️ Valider des textes et lois</h2>


          <input
            type="text"
            className="form-control mb-3"
            placeholder="🔍 Rechercher par titre, catégorie, mots-clés ou date"
            value={search}
            onChange={handleSearchChange}
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((n) => (
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
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            className="btn btn-sm btn-secondary me-2"
                            onClick={() => handleEdit(n)}
                            title="Modifier"
                          >
                            ✏️ Modifier
                          </button>

                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleValidate(n.id)}
                            title="Valider"
                          >
                            ✅ Valider
                          </button>

                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => openRejectModal(n.id)}
                            title="Rejeter"
                          >
                            ❌ Rejeter
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">
                      Aucun résultat trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            totalItems={filteredNormes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>

      {/* Footer */}
    <Footer/>

      {/* Modale pour saisir le motif de rejet */}
     <div
  className={`modal fade ${showRejectModal ? "show d-flex" : "d-none"}`}
  tabIndex="-1"
  role="dialog"
  style={{
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1050,
  }}
  onClick={handleBackdropClick}
>
  <div
    className="modal-dialog"
    role="document"
    style={{
      maxWidth: "820px",
      margin: "0 15px",
      borderRadius: "12px",
      boxShadow: "0 6px 35px rgba(0,0,0,0.4)",
    }}
    onClick={(e) => e.stopPropagation()}
  >
    <div className="modal-content" style={{ borderRadius: "12px" }}>
      <div
        className="modal-header"
        style={{
          borderBottom: "none",
          padding: "1.25rem 2rem",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          fontWeight: "700",
          fontSize: "1.3rem",
          borderTopLeftRadius: "9000px",
          borderTopRightRadius: "9000px",
        }}
      >
        <h5 className="modal-title">Motif de rejet</h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setShowRejectModal(false)}
          style={{ filter: "invert(1)" }}
        ></button>
      </div>

      <div className="modal-body" style={{ padding: "1.5rem 2rem" }}>
        <textarea
          className="form-control"
          rows={12}
          placeholder="Entrez la raison du rejet ici..."
          value={rejectMotif}
          onChange={(e) => setRejectMotif(e.target.value)}
          autoFocus
          style={{
            resize: "vertical",
            minHeight: "300px",
            width: "100%",      // ici largeur 100% du container modal-body
            fontSize: "1.2rem",
            padding: "12px",
            lineHeight: "1.4",
            borderRadius: "6px",
            borderColor: "#ced4da",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div
        className="modal-footer"
        style={{ borderTop: "none", padding: "2.9rem 7rem", justifyContent: "flex-end" }}
      >
        <button
          type="button"
          className="btn btn-outline-secondary me-3"
          onClick={() => setShowRejectModal(false)}
          style={{ padding: "0.5rem 1.5rem", fontSize: "1.1rem" }}
        >
          Annuler
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleReject}
          disabled={!rejectMotif.trim()}
          style={{ padding: "0.5rem 1.8rem", fontSize: "1.1rem" }}
        >
          Confirmer le rejet
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

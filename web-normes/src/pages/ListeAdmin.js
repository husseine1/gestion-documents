import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

export default function ListeAdmin() {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Nombre d'éléments par page
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/utilisateurs");
      setAdmins(res.data);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await api.delete(`/utilisateurs/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Échec de suppression");
    }
  };

  const handleEdit = (utilisateur) => {
    navigate(`/modifier-admin/${utilisateur.id}`);
  };

  const filteredAdmins = admins.filter((u) =>
    [
      u.nom,
      u.prenoms,
      u.pays,
      u.type_utilisateur,
      u.fonction,
      u.whatsapp,
      u.email,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <img src="logo.jpeg" alt="Logo Topic" style={{ height: 90 }} />
          </Link>
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

      <section className="featured-section">
        <div className="container">
          <h2 className="mb-4" style={{ color: 'yellow', textAlign: 'center' }}>📋 Liste des administrateurs</h2>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="🔍 Rechercher par nom, pays, fonction ou e‑mail"
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
                  <th>Civilité</th>
                  <th>Nom</th>
                  <th>Prénoms</th>
                  <th>Pays</th>
                  <th>Type d'utilisateur</th>
                  <th>Fonction</th>
                  <th>WhatsApp</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.map((u) => (
                  <tr key={u.id}>
                    <td>{u.civilite}</td>
                    <td>{u.nom}</td>
                    <td>{u.prenoms}</td>
                    <td>{u.pays}</td>
                    <td>{u.type_utilisateur}</td>
                    <td>{u.fonction}</td>
                    <td>{u.whatsapp}</td>
                    <td>{u.email}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEdit(u)}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(u.id)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredAdmins.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Aucun administrateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li
                      key={page}
                      className={`page-item ${page === currentPage ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
}

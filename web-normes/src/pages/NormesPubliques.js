import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from "react-router-dom";
import Footer from "./Footer";


export default function NormesPubliquesPage() {
  const [normes, setNormes] = useState([]);
  const [search, setSearch] = useState('');
  const [typeTexte, setTypeTexte] = useState('');
  const [domaineActivite, setDomaineActivite] = useState('');
  const [paysRegion, setPaysRegion] = useState('');
  const [applyFilters, setApplyFilters] = useState(false);

useEffect(() => {
  async function fetchNormes() {
    try {
      const res = await api.get('/normes/public', {
        params: {
          search,
          typeTexte,
          domaineActivite,
          paysRegion,
          applyFilters: applyFilters ? 1 : 0,
        },
      });
      setNormes(res.data);
    } catch (e) {
      console.error('Erreur API normes :', e);
    }
  }

  fetchNormes();
}, [search, typeTexte, domaineActivite, paysRegion, applyFilters]);

  const filtered = normes
    .filter(n => n.compteur_validation === 1) // ✅ seulement les normes validées
    .filter(n => {
      const s = search.toLowerCase();
      const matchesSearch =
        n.domaine?.toLowerCase().includes(s) ||
        n.categorie?.toLowerCase().includes(s) ||
        n.description_du_texte?.toLowerCase().includes(s) ||
        n.source?.toLowerCase().includes(s);

      if (!applyFilters) return matchesSearch;

      const matchesTypeTexte = typeTexte === '' || n.categorie?.toLowerCase() === typeTexte.toLowerCase();
      const matchesDomaineActivite =
        domaineActivite === '' || n.domaine_activite?.toLowerCase().includes(domaineActivite.toLowerCase());
      const matchesPaysRegion =
        paysRegion === '' || n.pays_ou_region?.toLowerCase().includes(paysRegion.toLowerCase());

      return matchesSearch && matchesTypeTexte && matchesDomaineActivite && matchesPaysRegion;
    });

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img 
              src="logo.jpeg" 
              alt="Logo Topic" 
              style={{ height: '90px', width: 'auto' }} 
            />
          </a>

          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#nav"
            aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-lg-5 me-lg-auto d-flex align-items-center">
              {['Accueil', 'À propos', 'Actualités', 'Tableau de gestion'].map((t, i, arr) => (
                <li
                  key={t}
                  className="nav-item"
                  style={{ color: '#045148ff', display: 'flex', alignItems: 'center' }}
                >
                  <a className="nav-link" href="#" style={{ color: 'green' }}>
                    <strong>{t}</strong>
                  </a>
                  {i < arr.length - 1 && (
                    <span style={{ color: '#045148ff', margin: '0 8px' }}>|</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="d-none d-lg-block">
              <Link to="/login" className="navbar-icon bi-person smoothscroll">
                <span className="visually-hidden">Connexion</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero-section d-flex flex-column justify-content-center align-items-center bg-dark text-white"
        style={{ minHeight: '50vh', paddingBottom: '4rem', marginTop: '0', paddingTop: '0' }}
      >
        <div className="container text-center mb-4">
          <h2 style={{ color: 'yellow' }}>
            PORTAIL AFRICAIN DES DELAIS DE CONSERVATION DES DOCUMENTS ADMINISTRATIFS
          </h2>
          <p className="lead"  style={{ color: 'white' ,fontWeight: 'bold', }}>
            Projet pilote couvrant 4 pays (Bénin, Caméroun, Côte d'Ivoire et Gabon) réalisé avec le soutien de la Commission des Programmes du Conseil International des Archives (ICA-PCOM 2024)
          </p>

          <form className="custom-form mt-4 mb-5" onSubmit={e => e.preventDefault()}>
            <div className="input-group input-group-lg">
              <span className="input-group-text bi-search"></span>
              <input
                type="search"
                className="form-control"
                placeholder="🔍 Rechercher par titre, catégorie, date ou mot-clé"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Rechercher</button>
            </div>
          </form>
        </div>

        <div className="container">
          <form className="row g-3 justify-content-center" onSubmit={e => e.preventDefault()}>
            <div className="col-md-3 col-12">
              <select
                className="form-control"
                value={typeTexte}
                onChange={e => setTypeTexte(e.target.value)}
              >
                <option value="">Type de texte</option>
                <option value="code">code</option>
                <option value="lois">lois</option>
                <option value="règlement">règlement</option>
                <option value="circulaire">circulaire</option>
                <option value="ordonance">ordonnance</option>
                <option value="décret">décret</option>
                <option value="arrêté">arrêté</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="col-md-3 col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Domaine d'activités"
                value={domaineActivite}
                onChange={e => setDomaineActivite(e.target.value)}
              />
            </div>

            <div className="col-md-3 col-12">
              <select
                className="form-control"
                value={paysRegion}
                onChange={e => setPaysRegion(e.target.value)}
              >
                <option value="">Pays ou Région</option>
                <option value="cote d'ivoire">COTE D'IVOIRE</option>
                <option value="cameroun">CAMEROUN</option>
                <option value="benin">BENIN</option>
                <option value="gabon">GABON</option>
              </select>
            </div>

            <div className="col-md-2 col-12 d-flex align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="applyCheckbox"
                  checked={applyFilters}
                  onChange={e => setApplyFilters(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="applyCheckbox">
                  Appliquer
                </label>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Tableau : affiché uniquement si recherche ou filtre actif */}
      {(search.trim() !== '' || applyFilters) ? (
        <section className="featured-section py-5">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="custom-block bg-white shadow-lg p-4">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-striped table-hover w-100 mb-0"
                      style={{ minWidth: '1500px' }}
                    >
                      <thead className="table-dark">
                        <tr>
                          {[
                            "Description du texte", "Référence du texte", "Documents concernés", "Domaines",
                            "Type de texte", "Domaine d'activité", "Pays ou Région", "Source",
                            "Validité du texte", "Télécharger le fichier"
                          ].map(h => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.length === 0 ? (
                          <tr>
                            <td colSpan="12" className="text-center p-4">
                              Aucune norme trouvée.
                            </td>
                          </tr>
                        ) : (
                          filtered.map(n => (
                            <tr key={n.id || n.reference_du_texte}>
                              <td>{n.description_du_texte}</td>
                              <td>{n.reference_du_texte}</td>
                              <td>{n.document_concerne}</td>
                              <td>{n.domaine}</td>
                              <td>{n.categorie}</td>
                              <td>{n.domaine_activite}</td>
                              <td>{n.pays_ou_region}</td>
                              <td>{n.source}</td>
                              <td>{n.date_pub}</td>
                              <td>
                                {n.fichier ? (
                                  <div className="d-flex flex-column gap-2">
                                    <a
                                      href={`http://localhost:3000/uploads/${n.fichier}`}
                                      className="btn btn-sm btn-primary"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      👁️ Visualiser
                                    </a>
                                    {n.telechargement === 1 || n.telechargement === true ? (
                                      <a
                                        href={`http://localhost:3000/uploads/${n.fichier}`}
                                        className="btn btn-sm btn-success"
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        📥 Télécharger
                                      </a>
                                    ) : (
                                      <span className="text-muted small">🚫 Téléchargement désactivé</span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-muted">Aucun fichier</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Footer */}
<div className="container mt-2">
  <p style={{ color: '#045148ff', fontWeight: 'bold', textAlign: 'center' , fontSize: '1.2rem' , marginBottom: '3rem' ,marginTop : '3rem',}}>
    Le Portail des Délais de Conservation des Documents Administratifs est une plateforme centralisée visant à regrouper l'ensemble des textes législatifs et réglementaires, ainsi que les normes en vigueur, relatifs à la conservation et à la gestion des documents et archives au sein des États africains.
    Actuellement, cette phase pilote concerne quatre pays : le Bénin, le Cameroun, la Côte d'Ivoire et le Gabon.
  </p>
  {/* Ligne horizontale de séparation */}
  <hr style={{ borderTop: '4px solid #045148ff', margin: '1rem 0' }} />
</div>



 <Footer/>

    </>
  )
}

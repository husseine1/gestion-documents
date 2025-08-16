import { Link } from "react-router-dom";

const role = localStorage.getItem("role"); // 'Super Administrateur' ou 'Administrateur'

const allLinks = [
  { text: "Charger un texte", to: "/ajouter-norme", role: ["Super Administrateur", "Administrateur"] },
  { text: "Créer un admin", to: "/créer-admin", role: ["Super Administrateur"] },
  { text: "Liste des admins", to: "/Liste-admin", role: ["Super Administrateur"] },
  { text: "Liste des textes et lois", to: "/admin", role: ["Super Administrateur", "Administrateur"] },
  { text: "Valider la Liste des textes et lois", to: "/valider-norme", role: ["Super Administrateur"] },
];

export default function NavMenu() {
  return (
    <ul className="navbar-nav d-flex flex-row gap-3 ms-4">
      {allLinks
        .filter(link => link.role.includes(role))
        .map(({ text, to }) => (
          <li key={text} className="nav-item">
            <Link 
              className="nav-link fw-bold" 
              to={to}
              style={{ color: '#045148ff' }} // couleur verte personnalisée
            >
              {text}
            </Link>
          </li>
        ))}
    </ul>
  );
}

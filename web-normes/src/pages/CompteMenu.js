import { useEffect, useState } from "react";

export default function CompteMenu() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const nom = localStorage.getItem("nom");
    const userRole = localStorage.getItem("role");
    const userEmail = localStorage.getItem("email");

    if (nom) setUsername(nom);
    if (userRole) setRole(userRole);
    if (userEmail) setEmail(userEmail);
  }, []);

  return (
    <div className="ms-auto me-3">
      <div className="dropdown">
        <button
          className="btn btn-outline-primary dropdown-toggle fw-bold fs-5"
          type="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle me-2"></i>
          {username ? `👤 ${username}` : "Compte"}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="userDropdown"
          style={{ minWidth: "250px" }}
        >
          {email && (
            <li>
              <span className="dropdown-item-text fw-bold">
                📧 {email}
              </span>
            </li>
          )}
          {role && (
            <li>
              <span className="dropdown-item-text text-muted">
                🛡️ {role}
              </span>
            </li>
          )}
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button
              className="dropdown-item text-danger"
              onClick={() => {
                if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
                  localStorage.removeItem("token");
                  localStorage.removeItem("nom");
                  localStorage.removeItem("role");
                  localStorage.removeItem("email");
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
  );
}

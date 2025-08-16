// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 text-danger mb-4">404</h1>
      <h2 className="mb-3">Page non trouvée</h2>
      <p className="lead mb-4">
        Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}

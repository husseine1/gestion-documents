import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", {
        email,
        password
      });

      console.log("Réponse de l'API :", res.data);

      // ✅ Stocker le token complet avec 'Bearer'
     localStorage.setItem("token", res.data.token);


      // ✅ Stocker les infos de l'admin
      localStorage.setItem("adminId", res.data.admin.id);
      localStorage.setItem("adminEmail", res.data.admin.email);
      localStorage.setItem("role", res.data.role);

      console.log("Admin connecté :", res.data.admin);

      // ✅ Rediriger vers le tableau de bord
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Erreur : " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <section
        className="hero-section d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundImage: "url('images/campus.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mx-auto">
              <div className="bg-white p-5 shadow rounded">
                <div className="mb-4 d-flex justify-content-center">
                  <img
                    src="logo.jpeg"
                    alt="Logo Topic"
                    style={{ height: "90px", width: "auto" }}
                  />
                </div>
                <h2 className="text-center mb-4">Connexion Admin</h2>
                <h6 className="text-center mb-4">Bienvenue ! Connectez-vous à votre espace.</h6>

                <form onSubmit={handleLogin} className="custom-form">
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary text-nowrap">
                      Se connecter
                    </button>
                  </div>
                </form>

                {/* 🔁 Bouton de retour au site */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => window.location.href = "/"}
                  >
                    Retour au site
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

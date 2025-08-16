import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NormesPubliques from "./pages/NormesPubliques";
import AjouterNorme from "./pages/AjouterNorme";
import CreAdmin from  "./pages/CreAdmin";
import ValiderNorme from  "./pages/ValiderNorme";
import ListeAdmin from  "./pages/ListeAdmin";
import ModifierAdmin from "./pages/ModifierAdmin";
import ModifierNorme from "./pages/ModifierNorme";
import SetPasswordPage from "./pages/SetPasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NormesPubliques />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={ <ProtectedRoute> <AdminDashboard /></ProtectedRoute> } />
      <Route path="*" element={<LoginPage />} />
      <Route path="/ajouter-norme" element={<ProtectedRoute><AjouterNorme /></ProtectedRoute>} />
      <Route path="/créer-admin" element={<ProtectedRoute><CreAdmin/></ProtectedRoute>} />
      <Route path="/valider-norme" element={<ProtectedRoute><ValiderNorme/></ProtectedRoute>} />
      <Route path="/Liste-admin" element={<ProtectedRoute><ListeAdmin/></ProtectedRoute>} />
      <Route path="/modifier-admin/:id" element={<ModifierAdmin />} />
      <Route path="/modifier-norme/:id" element={<ModifierNorme />} />
      <Route path="/creer-mot-de-passe" element={<SetPasswordPage />} />

    </Routes>
  );
}

export default App;

import axios from 'axios';

// Crée une instance Axios avec la base URL de ton API
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // adapte selon ton backend
  timeout: 12000000, // timeout 10s
});

// Ajoute un interceptor pour injecter le token dans les headers Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ici on suppose que tu stockes uniquement le token JWT (sans "Bearer ")
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de réponse pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        alert("Session expirée, veuillez vous reconnecter.");
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      // Gérer d'autres codes d'erreur globaux si besoin
    }
    return Promise.reject(error);
  }
);

export default api;

import { jwtDecode } from "jwt-decode";

export const getUsuarioAutenticado = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const ahora = Date.now() / 1000; // Tiempo actual en segundos
    if (decoded.exp && decoded.exp < ahora) {
      // Token expirado
      localStorage.removeItem("token");
      return null;
    }

    return decoded; // Contiene el `id`, `roles`, etc.
  } catch (error) {
    console.error("Error al decodificar token:", error);
    localStorage.removeItem("token");
    return null;
  }
};
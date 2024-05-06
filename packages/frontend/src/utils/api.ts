import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showAlert } from "~/components/Alert";
import { User } from "types";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Cookies
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig | any) => {
    // si tiene token se añade al header de la peticion.
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },

  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Check if the response data has a "message" field
    if (response.data && response.data.message) {
      showAlert(response.data.message, "success");
    }

    return response;
  },
  async (error: AxiosError<{ message: string }>) => {
    // Handle error responses here
    if (error.response && error.response.data && error.response.data.message) {
      console.error("Error Response Message:", error.response.data.message);
      showAlert(error.response.data.message, "error");
    }

    if (error.response?.status === 401) {
      // Si el estatus de la respuesta es 401 el token de acceso no es válido
      // Intentará obtener uno nuevo utilizando el access token
      // comprueba si el usuario está guardado en localStorage
      const user = localStorage.getItem("user")
        ? (JSON.parse(localStorage.getItem("user") as string) as User)
        : null;

      if (user) {
        const res = await api.get<string>(`/auth/refresh?userId=${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true, // Cookies
        });

        if (res.status === 200) {
          localStorage.setItem("token", res.data);
        } else {
          return Promise.reject(error);
        }
      }
    } else if (error.response?.status === 403) {
      // El usuario ya no tiene autorización
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { api };

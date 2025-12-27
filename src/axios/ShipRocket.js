import axios from "axios";
const shipRocketApi = axios.create({
  baseURL: import.meta.env.VITE_SHIP_ROCKET_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default shipRocketApi;

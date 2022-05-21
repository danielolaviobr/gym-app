import axios from "axios";

let api = axios.create({ baseURL: "/api" });

export default api;

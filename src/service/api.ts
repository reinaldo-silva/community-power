import axios from "axios";

const api = axios.create({
  baseURL: "https://0236-45-176-26-44.ngrok.io",
});

api.defaults.validateStatus = () => {
  return true;
};

export { api };

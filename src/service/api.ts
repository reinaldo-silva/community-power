import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.defaults.validateStatus = () => {
  return true;
};

export { api };

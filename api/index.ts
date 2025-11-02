import axios from "axios";

const petsApi = axios.create({
  baseURL: "https://pets-react-query-backend.eapi.joincoded.com",
});

export default petsApi;

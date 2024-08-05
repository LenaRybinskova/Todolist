import axios from "axios";

export const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: { "API-KEY": "2c45728a-68be-4862-8b0c-8cd42989c7e6" },
});

import axios from "axios";

const API = "http://192.168.2.224:9099/api/auth";

export const login = (username: string, password: string) => {
  return axios
    .post(API + "/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { login, logout };

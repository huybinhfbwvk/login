import axios from "axios";
import authHeader from "./auth-header";

interface getUserProps {
  currentPage: Number;
  pageSize: Number;
}

const API = `http://192.168.2.224:9099/api/`;
const token = localStorage.getItem("accessToken");

const getUser = ({ currentPage, pageSize }: getUserProps) => {
  return axios
    .get(API + "user/", {
      headers: { Authorization: "Bearer " + token },
      params: { currentPage, pageSize },
    })
    .then((response) => {
      JSON.stringify(response.data);
      return response.data;
    });
};

export default { getUser };

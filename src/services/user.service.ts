import axios from "axios";
<<<<<<< HEAD
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
=======

const API = "http://192.168.2.224:9099/api";

export const getUser = (page: number, perPage: number) => {
  return axios
    .get(API + "/user", {
      params: {
        page,
        per_page: perPage,
      },
    })
    .then((response) => {
>>>>>>> 8884e583758db037b04ea12cf573805c0e2662b2
      return response.data;
    });
};

export default { getUser };

import axios from "axios";
import authHeader from "./auth-header";

interface getPhongBanProps {
  currentPage: Number;
  pageSize: Number;
}

const API = `http://192.168.2.224:9099/api/`;
const token = localStorage.getItem("accessToken");

const getPhongBan = ({ currentPage, pageSize }: getPhongBanProps) => {
  return axios
    .get(API + "danhmuc/phongban", {
      headers: { Authorization: "Bearer " + token },
      params: { currentPage, pageSize },
    })
    .then((response) => {
      JSON.stringify(response.data);
      return response.data.result;
    });
};

export default { getPhongBan };

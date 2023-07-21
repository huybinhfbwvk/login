import axios from "axios";
import authHeader from "./auth-header";

interface getUnitProps {
  currentPage: Number;
  pageSize: Number;
}

const API = `http://192.168.2.224:9099/api/`;
const token = localStorage.getItem("accessToken");

const getUnit = ({ currentPage, pageSize }: getUnitProps) => {
  return axios
    .get(API + "danhmuc/donvi", {
      headers: { Authorization: "Bearer " + token },
      params: { currentPage, pageSize },
    })
    .then((response) => {
      JSON.stringify(response.data);
      return response.data.data;
    });
};

export default { getUnit };

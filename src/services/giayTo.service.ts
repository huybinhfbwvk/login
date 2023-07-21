import axios from "axios";

interface getPapersProps {
  currentPage: Number;
  pageSize: Number;
}

const API = `http://192.168.2.224:9099/api/`;
const token = localStorage.getItem("accessToken");

const getPapers = ({ currentPage, pageSize }: getPapersProps) => {
  return axios
    .get(API + "loaigiayto", {
      headers: { Authorization: "Bearer " + token },
      params: { currentPage, pageSize },
    })
    .then((response) => {
      JSON.stringify(response.data.data);
      return response.data.data;
    });
};

export default { getPapers };

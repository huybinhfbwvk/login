import axios from "axios";

interface getUserGroupProps {
  itemPerPage: Number;
  page: Number;
}

const API = `http://192.168.2.224:9099/api/group`;
const token = localStorage.getItem("accessToken");

const getUserGroup = ({ itemPerPage, page }: getUserGroupProps) => {
  return axios
    .get(API, {
      headers: { Authorization: "Bearer " + token },
      params: { itemPerPage, page },
    })
    .then((response) => {
      JSON.stringify(response.data.result);
      return response.data.result;
    });
};

export default { getUserGroup };

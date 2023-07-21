import axios from "axios";

const API = `http://192.168.2.224:9099/api/`;
const token = localStorage.getItem("accessToken");

const getUnitLevel = () => {
  return axios
    .get(API + "danhmuc/capdonvi", {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      JSON.stringify(response.data);
      return response.data.result;
    });
};

export default { getUnitLevel };

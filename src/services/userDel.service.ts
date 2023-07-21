import axios from "axios";
import authHeader from "./auth-header";

interface delUserProps {
  id: [];
}

const API = `http://192.168.2.224:9099/api/`;
const token = localStorage.getItem("accessToken");

const delUser = ({ id }: delUserProps) => {
  return axios
    .delete(API + "user/", {
      headers: { Authorization: "Bearer " + token },
      data: id,
    })
    .then((response) => {
      console.log("Delete request successful!", response);
      // Handle successful response, if needed
      return response;
    })
    .catch((error) => {
      console.error("Delete request failed:", error);
      // Handle error, if needed
    });
};

export default { delUser };

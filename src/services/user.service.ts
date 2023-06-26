import axios from "axios";

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
      return response.data;
    });
};

export default { getUser };

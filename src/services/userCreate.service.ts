import axios from "axios";

interface CreateUserControl {
  data: any;
}

const API = `http://192.168.2.224:9099/api/user/`;
const token = localStorage.getItem("accessToken");

const CreateUser = async ({ data }: CreateUserControl) => {
  axios
    .post(API, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { CreateUser };

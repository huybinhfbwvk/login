import axios from "axios";
import { log } from "console";
import { randomFillSync } from "crypto";

interface AddPaperProps {
  data: any;
}

const API = `http://192.168.2.224:9099/api/loaigiayto`;
const token = localStorage.getItem("accessToken");

const AddPaper = async ({ data }: AddPaperProps) => {
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

export default { AddPaper };

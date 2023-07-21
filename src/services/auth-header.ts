export default function authHeader() {
  const userName: any = localStorage.getItem("user");
  const user = JSON.parse(userName);

  if (user && user.accessToken) {
<<<<<<< HEAD
    console.log(user.accessToken);
=======
>>>>>>> 8884e583758db037b04ea12cf573805c0e2662b2
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

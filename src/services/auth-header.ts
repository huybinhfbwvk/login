export default function authHeader() {
  const userName: any = localStorage.getItem("user");
  const user = JSON.parse(userName);

  if (user && user.accessToken) {
    console.log(user.accessToken);
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

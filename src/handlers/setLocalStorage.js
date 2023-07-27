export const setUserLocally = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify({ ...user }));
  }
};

export const getToken = () => {
  let name = JSON.parse(localStorage.getItem("user"));
  console.log(name);
  return name;
};

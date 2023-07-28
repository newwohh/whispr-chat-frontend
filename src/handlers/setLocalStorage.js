export const setUserLocally = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify({ ...user }));
  }
};

export const removeUserLocally = (user) => {
  if (user) {
    localStorage.removeItem("user");
  }
};

export const loginHandler = async (email, password) => {
  try {
    const request = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    });
    const response = await request.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

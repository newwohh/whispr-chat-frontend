export const signupHandler = async (name, email, password, passwordConfirm) => {
  try {
    const request = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password2: passwordConfirm,
        tc: "True",
      }),
      credentials: "include",
    });
    const response = await request.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const logInBtn = $("#logIn-btn");
const logOutBtn = $("#logout");

const logIn = async (event) => {
  event.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();

  if (username && password) {
    try {
      const response = await fetch("/api/blogUser/log-in", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
            document.location.replace("/profile");
      }
    } catch (err) {
      console.error(err);
    }}
  };

const logOut = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("api/blogUser/logout", {
      method: "POST",
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

logInBtn.on("click", logIn);
logOutBtn.on("click", logOut);

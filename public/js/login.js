const logInBtn = $("#logIn-btn");
const logOutBtn = $("#logout");

const logIn = async (event) => {
  event.preventDefault();

  const username = $("#username").val();
  const password = $("#password").val();

  if (username && password) {
    try {
       const response = await fetch("/log-in", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      console.log(data);
      if (data) {
        
        document.location.replace(`/profile/${data.user.id}`);
      } else {
        alert(data.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  }
};

const logOut = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("/logout", {
      method: "POST",
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("error during logout:", error);
  }
};

logInBtn.on("click", logIn);
logOutBtn.on("click", logOut);

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
      
      if (response.ok) {
        const { user_id } = await response.json();
        try {
          const profileResponse = await fetch(`/profile/${user_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (profileResponse.ok) {

            const profile = await profileResponse.json();
            document.location.replace("/profile");
            
          } else {
            console.error("Error fetching profile data:", profileResponse.statusText);
            alert("Error fetching profile data. Please try again.");
          }
        } catch (innerError) {
          console.error("Error fetching profile data:");
          alert("An error occurred while fetching profile data.");
        }
      } else {
        console.error("Error during login:", data.statusText);
        alert("Login failed. Please check your credentials and try again.");
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

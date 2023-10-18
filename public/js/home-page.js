const commentBtn = $("#comment-btn");
const postCards = $(".postCards");
const dash = $("#dash");

const goProfile = async (event) => {

  try {
    const response = await fetch(`/profile/${user.dataValues.id}`, {
      method: "GET",
    })

    const data = await response.json();

    if (data.user) {
      document.location.replace(`/profile/${data.user.id}`);
    } else {
      alert("User data not found");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const addComment = async (event) => {
  event.preventDefault();

  const newComment = $("#new-comment").val();

  if (newComment) {
    try {
      const response = await fetch("/home-page", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("comment posted.");
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  } else {
    alert("Please fill in comment field.");
  }
};

const singlePost = async (event) => {
  try {
    console.log(event.target.id);
    let id = event.target.id;
    const response = await fetch(`/post/${id}`, {
      method: "GET",
    });

    if (response.ok) {
      const postData = await response.json();
      console.log("Viewing single post:", postData);
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error viewing post:", error);
  }
};

postCards.on("click", singlePost);
commentBtn.on("click", addComment);
dash.on("click", goProfile);

const commentBtn = $(".comment-btn");
const postCards = $("#post-card");

const addComment = async (event) => {
  event.preventDefault();

  const newComment = $("#new-comment").val();

  if (newComment) {
    try {
      const response = await fetch("/api/blogComment", {
        method: "POST",
        body: JSON.stringify( { body: newComment}),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("comment posted.")
        document.location.reload();
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

const viewPost = async (event) => {
  event.preventDefault();

  try {

    const response = await fetch("/post/:id", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace('single-post');
    } else {
      console.error("Failed to fetch post data.");
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
};

commentBtn.on("click", addComment);
postCards.on("click", viewPost);
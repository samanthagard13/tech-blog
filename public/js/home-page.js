const commentBtn = $(".comment-btn");


const addComment = async (event) => {
  event.preventDefault();
  const postId = $('input[name="post-id"]').val()
  const newComment = $('textarea[name="comment-body"]').val();

  if (newComment) {
    try {
      const response = await fetch("/api/blogComment", {
        method: "POST",
        body: JSON.stringify( { body: newComment, postId}),
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

commentBtn.on("submit", addComment);

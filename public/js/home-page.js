const commentBtn = $(".comment-btn");

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

  const clickedPost = $(event.target).closest('.blog-post').data('post-id');

  try {
    const response = await fetch(`/post/${clickedPost}`, {
      method: 'GET',
    });

    if (response.ok) {
      document.location.replace('/single-post')
    } else {
      console.error('Error fetching post details:', response.statusText);
      window.location.href = '/error';
    }
  } catch (error) {
    console.log(error);
    window.location.href = '/error';
  }
};

commentBtn.on("click", addComment);
$('.post-container').on('click', '.blog-post', viewPost);

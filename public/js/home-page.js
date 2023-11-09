const commentBtn = $(".comment-btn");
// const postCard = $(".blog-post");

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

$(document).ready(function() {
  $('#post-container').on('click', '.view-post', function(event) {
    const postId = $(this).closest('.blog-post').data('post-id');
    viewPost(event, postId);
  });
});

const viewPost = async (event, postId) => {
  event.preventDefault();

  try {
    const response = await fetch(`/post/${postId}`, {
      method: 'GET',
    });

    if (response.ok) {
      window.location.href = '/single-post';
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
// postCard.on("click", viewPost);
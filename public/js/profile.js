const postBtn = $('#newPost-btn');

const makePost = async (event) => {
    event.preventDefault();

    const title = $('#new-title').val();
    const contents = $('#new-post').val();

    if (title && contents) {
        try {
            const response = await fetch("/profile", {
                method: "POST",
                body: JSON.stringify({
                title: title,
                contents: contents,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace("/");
      }
    } catch (err) {
      console.error(err);
    }}
}

postBtn.on('click', makePost);
const postBtn = $('#newPost-btn');

const makePost = async (event) => {
    event.preventDefault();

    const title = $('#new-title').val();
    const post = $('#new-post').val();
    const dateCreated = new Date().toISOString();

    if ( title && post) {
        try {
          const response = await fetch('/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const { username } = await response.json();

          const postResponse = await fetch('api/blog', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                dateCreated: dateCreated,
                contents: post,
                username: username,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

            if (postResponse.ok) {
                console.log('post created.');
                location.reload();
              } else {
                alert(postResponse.statusText);
            }
        } else {
            alert('Error fetching username from the server.');
        }
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post');
    }
} else {
    alert('Please fill in both title and post fields.');
}
};

postBtn.on('click', makePost);
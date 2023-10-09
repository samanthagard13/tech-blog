const postBtn = $('#newPost-btn');

const makePost = async (event) => {
    event.preventDefault();

    const title = $('#new-title').val();
    const post = $('#new-post').val();
    
    const date_created = new Date().toISOString();

    if ( title && post) {
        try {
            const response = await fetch('/profile', {
                method: 'POST',
                body: JSON.stringify({ username, title, date_created, contents: post, comments: []  }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('post created.');
            } else {
                alert(response.statusText);
              }
            } catch (error) {
                console.error('Error creating post:', error);
              }
            } else {
              alert('Please fill in both title and post fields.');
            }
        
    };

postBtn.on('click', makePost);
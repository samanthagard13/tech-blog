const commentBtn = $('#comment-btn')

const addComment = async (event) => {
    event.preventDefault();
    
    const newComment = $('#new-comment').val();

    if (newComment) {
        try {
            const response = await fetch('/home-page', {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                console.log('comment posted.');
            } else {
                alert(response.statusText);
              }
            } catch (error) {
                console.error('Error posting comment:', error);
              }
            } else {
              alert('Please fill in comment field.');
            }
        
    };

    commentBtn.on('click', addComment);
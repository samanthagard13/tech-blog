const signUpBtn = $('.signUp-btn');

  const signUp = async (event) => {
      event.preventDefault();
      const username = $('#newUsername').val();
      const password = $('#newPassword').val();

      if (username && password) {
          try {
              const response = await fetch('/api/blogUser', {
                  method: 'POST',
                  body: JSON.stringify({ username: username, password: password }), // Shorthand property syntax
                  headers: { 'Content-Type': 'application/json' },
              });
              console.log(response.body);
              if (response.ok) {
                  document.location.replace('/profile');
              } else {
                  alert(response.statusText);
              }
          } catch (error) {
              console.error('Error during account creation:', error);
              alert('An error occurred during account creation. Please try again later.');
          }
      }
  };

  signUpBtn.on('click', signUp);
    
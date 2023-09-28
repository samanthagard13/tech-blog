const logInBtn = $('#logIn-btn');

const logIn = async (event) => {
    event.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    if ( username && password ) {
      try {
        const response = await fetch('/log-in', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            document.location.replace('/profile');
          } else {
            alert(response.statusText);
          }
        } catch (error) {
          console.error('Error during login:', error);
          alert('An error occurred during login.');
      }
  }
};

      logInBtn.on('click', logIn);
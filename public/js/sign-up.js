$(document).ready(function () {
const signUpBtn = $('.signUp-btn');

const signUp = async (event) => {

    const username = $('#newUsername').val();
    const password = $('#newPassword').val();

    if ( username && password ) {
        try {
            const response = await fetch('/sign-up', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
              });
          
              if (response.ok) {
                document.location.replace('/log-in');
              } else {
                alert(response.statusText);
              }
            } catch (error) {
              console.error('Error during account creation:', error);
              alert('An error occurred during account creation.');
          }
      }
    }
    signUpBtn.on('click', signUp);
  }); 

    
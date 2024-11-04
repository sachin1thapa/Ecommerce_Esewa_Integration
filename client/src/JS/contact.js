import { updateNavbarCount } from './updateNavbarCount.js';

updateNavbarCount();

let form = document.querySelector('#form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let username = document.querySelector('#username').value;
  let UserEmail = document.querySelector('#email').value;
  let message = document.querySelector('#message').value;
  let subject = document.querySelector('#subject').value;
  const body = 'Name: ' + username + '<br/> Email: ' + UserEmail + '<br/> Message: ' + message;

  Email.send({
    Host: 'smtp.elasticemail.com',
    Username: 'test@gmail.com',
    Password: '',
    To: 'test@gmail.com',
    From: 'test@gmail.com',
    Subject: subject,
    Body: body,
  })
    .then((message) => {
      alert(message);
      form.reset();
    })
    .catch((error) => {
      alert('Error sending email: ' + error);
    });
});

import { updateNabbarCount } from "./updateNabbarCount.js";

updateNabbarCount();


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
    Username: 'thapasachin572@gmail.com',
    Password: '8C87B3CA6F08E977D71F2E1E3DE56409B33C',
    To: 'thapasachin572@gmail.com',
    From: 'thapasachin572@gmail.com',
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

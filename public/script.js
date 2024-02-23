function Login() {
  var login = document.getElementById("login").value;
  var pass = document.getElementById("pass").value;

  //send data
  fetch('http://localhost:4000/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    body: JSON.stringify({ username: login, password: pass})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function CreateUser() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  var building = document.getElementById("building").value;
  console.log(email+building);
  fetch('http://localhost:4000/CreateUser', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    body: JSON.stringify({ username:username, password:password, email:email, building:building})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


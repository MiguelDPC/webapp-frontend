function submitForm() {
  console.log("Ran");
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  //send data
  fetch('http://localhost:4000/api', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    body: JSON.stringify({ name: name, email: email})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

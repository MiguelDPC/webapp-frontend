async function Login(login, pass, sessId) {

  //send data
  const response = await fetch('http://localhost:4000/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    body: JSON.stringify({ username: login, password: pass, sessId:sessId})
  })
//  .then(response => response.json())
//  .then(data => {
//    console.log(data);
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });
  
  return response.json()
}

async function CreateUser(username, password, email, firstname, lastname, phone, address, city, state, zip, notes, title, role, building) {

  const response = await fetch('http://localhost:4000/CreateUser', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    body: JSON.stringify({ username:username, password:password, email:email, firstname:firstname, lastname:lastname, phone:phone, address:address, city:city, state:state, zip:zip, notes:notes, title:title, role:role, building:building}),
  })
//  .then(response => response.json())
//  .then(data => {
//    console.log(data);
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });

  return response.json()
}

async function getSessionID(){
  const response = await fetch('http://localhost:4000/getsessionid', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    credentials: "include"
  })

  return response.json()
}

async function authenticated(sessId) {

  const response = await fetch('http://localhost:4000/authenticated', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    body: JSON.stringify({ sessId:sessId }),
    credentials: "include"
  })

  return response.json()
}

async function endsession(){

  const response = await fetch('http://localhost:4000/endsession', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
  })

  return response.json()
}

async function createtable(building){

  const response = await fetch('http://localhost:4000/createtable', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    body: JSON.stringify({building:building})
  })
  return response.json()
}

async function searchforusers(firstname, lastname, email, building){

  const response = await fetch('http://localhost:4000/searchforusers', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
      "Accept": "application/json",
    },
    body: JSON.stringify({firstname:firstname, lastname:lastname, email:email, building:building})
  })
  return response.json()
}

module.exports.CreateUser = CreateUser;
module.exports.login = Login;
module.exports.authenticated = authenticated;
module.exports.getSessionID = getSessionID;
module.exports.endsession = endsession;
module.exports.createtable = createtable;
module.exports.searchforusers = searchforusers;

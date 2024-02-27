const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const script = require('./public/script.js');
const https = require('https')
const fs = require('fs')

const key = fs.readFileSync('../webapp-backend/certificate/selfsigned.key')
const cert = fs.readFileSync('../webapp-backend/certificate/sefsigned.crt')

console.log(key)
const options = {
  key:key,
  cert: cert
}


let sessId = null;
let currentUser = {
  role: "user",
  user: null,
  auth: false,
  list: info = new Array()
};

app.set('view engine', 'ejs');
app.use("/public/", express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({extended: 'false'}))

app.get('/', async (req, res) => {
  const loginFailed = ''
  const username = currentUser.user;
  const role = currentUser.role;
  if (sessId === null) {
    sessId = await script.getSessionID();
  }

  if(currentUser.auth){
    res.render( "home", {data: {user:currentUser.user, role:currentUser.role}} );
   } else {
    res.render("index", {loginFailed});
  }
});

app.post("/logout", async (req, res) => {
  currentUser.auth = false,
  currentUser.user = null,
  currentUser.role = "user"
  const data = await script.endsession();
  res.redirect('/')
})

app.post("/admin/createUser", async (req, res) => {
  const {username, password, email, firstname, lastname, phone, address, city, state, zip, notes, title, role, building} = req.body
  const data = await script.CreateUser(username, password, email, firstname, lastname, phone, address, city, state, zip, notes, title, role, building)
  if (data["status"] != 500) {
    res.render("createuser",{data:{user:currentUser.user, role:currentUser.role, message:"User created Succesfully"}})
  } else {
    res.render("createuser", {data:{user:currentUser.user, role:currentUser.role, message:"Failed to Create User, User already Exist"}})
  }
})

app.post("/createtable", async (req, res) => {

  const {building} = req.body
  const data = await script.createtable(building)
  
  console.log(data)
})

app.post("/searchforusers", async (req, res) => {
  if(!currentUser.auth){ res.redirect('/')}

  const {firstname, lastname, email, building} = req.body
  const data = await script.searchforusers(firstname, lastname, email, building)
  if (data.status != '500'){
    res.render("searchpage", {data:{user:currentUser.user, role:currentUser.role, list:data.message}})
  } else {
    console.log(data.status)
    res.render("searchpage", {data:{user:currentUser.user, role:currentUser.role, list:data.status}})
  }
  console.log(data)
})

app.post("/deleteuser", async (req, res) => {
  if(!currentUser.auth){ res.redirect('/')}

  console.log(req.body)

})

app.post("/auth/login", async (req, res) => {
  const {username, password} = req.body
  const data = await script.login(username, password, sessId)  
  const loginFailed = 'Incorrect Password'
  const createMessage = ' '
  console.log("In /auth/login: " + data.message)
  
  if(data.status != '500'){
    currentUser.role = data.role;
    currentUser.user = username;
    currentUser.auth = data.message;
  }

  if(data.message){
    auth = data.message;
    res.redirect('/'); 
  } else {
    res.render("index", {loginFailed})
  }
})

app.post("/createuserpage", async (req, res) => {  
  if(!currentUser.auth){ res.redirect('/')}

  if(currentUser.auth && currentUser.role == "admin"){
    res.render( "createuser", {data:{user:currentUser.user, role:currentUser.role, message:"" }});
  } else res.render("nopermission", {data:{user:currentUser.user, role:currentUser.role}})
})

app.post("/createtablepage", async(req, res) => {
  if(!currentUser.auth){ res.redirect('/')}

  if(currentUser.auth && currentUser.role == "admin") {
    res.render( "createtable", {data:{user:currentUser.user, role:currentUser.role}})
  } else res.render("nopermission", {data:{user:currentUser.user, role:currentUser.role}})
})

app.post("/searchuserpage", async(req, res) => {
  if(!currentUser.auth){ res.redirect('/')}

  if(currentUser.auth && currentUser.role != "user") {
    res.render( "searchpage", {data:{user:currentUser.user, role:currentUser.role, list:currentUser.list}})
  } else res.render("nopermission", {data:{user:currentUser.user, role:currentUser.role}})
})

const server = https.createServer(options, app)

server.listen(port, () => {
 console.log('Sever hosted at http://localhost:' + port); 
});

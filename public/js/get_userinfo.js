var user = firebase.auth().currentUser;
var database = firebase.database().ref();
var name, email, emailVerified;
var userId;


firebase.auth().onAuthStateChanged(user=>{
  if(user){
    name = user.displayName;
    email = user.email;
    emailVerified = user.emailVerified;

    document.getElementById("sendVerifyEmail").classList.add('hide');
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    if (emailVerified == true) {
      document.getElementById("verification1").classList.add('hide');
      document.getElementById("verification2").classList.remove('hide');
      document.getElementById("sendVerifyEmail").classList.add('hide');
    }
    else {
      document.getElementById("verification1").classList.remove('hide');
      document.getElementById("verification2").classList.add('hide');
      document.getElementById("sendVerifyEmail").classList.remove('hide');
    }
  }
  else{
    console.log("Not logged in.");
  }
})

document.getElementById("btnUpdate").addEventListener('click', e=>{
  updateUserProfile();
})

function updateUserProfile() {
      var userNow = firebase.auth().currentUser;
        userNow.updateProfile({
        displayName: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value
      }).then(function() {
        var displayName = userNow.displayName;
        window.location.reload(true);
      }, function(error) {
        console.log("Couldn't update User Profile" + error.message);
      });
  }

firebase.auth().onAuthStateChanged(user=>{
    if(user){
      document.getElementById("btnLogOut").classList.remove('hide')
      document.getElementById("navbar-user").classList.remove('hide')
      document.getElementById("login_pic-nav").classList.add('hide')
      document.getElementById("login-nav").classList.add('hide')
      userId = user.uid;
      queryDatabase();
    }
    else {
      document.getElementById("btnLogOut").classList.add('hide')
      document.getElementById("navbar-user").classList.add('hide')
      document.getElementById("login_pic-nav").classList.remove('hide')
      document.getElementById("login-nav").classList.remove('hide')
    }
  })

document.getElementById("btnLogOut").addEventListener('click', e=>{
  firebase.auth().signOut();
  console.log('logged out');
  window.location.href = 'home.html';
})

function sendVerificationEmail() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log("Email Sent to: " + user.displayName);
  }).catch(function(error) {
    console.log(error.message);
  });
}

var isClocked;

function queryDatabase() {
  var databaseRef = database.child("users").child(userId).child("clocked");
  databaseRef.on('value', function(snapshot){
    isClocked = snapshot.val();
  });
}

function sendForm() {
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxii4b_fwf9YFx4clHl1HgL7bgClAt8QGDYSk8rwe9SExR6qidg/exec'
const form = document.forms['submit_to_google_sheet']

function clockIn() {
  if(isClocked == "true")
    return;

    document.getElementById("clocked").value = "Clocked In";
    database.child("users").child(userId).child("clocked").set("true");
    sendForm();
}

function clockOut() {
  if(isClocked == "false" || !isClocked)
    return;

    document.getElementById("clocked").value = "Clocked Out";
    database.child("users").child(userId).child("clocked").set("false");
    sendForm();
}

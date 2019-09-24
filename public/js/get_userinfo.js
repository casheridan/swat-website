var user = firebase.auth().currentUser;
var name, email, emailVerified;

firebase.auth().onAuthStateChanged(user=>{
  if(user){
    name = user.displayName;
    email = user.email;
    emailVerified = user.emailVerified;

    document.getElementById("name").innerHTML = name;
    console.log("Name: " + name);
  } else{
    console.log("Not logged in.");
  }
})

document.getElementById("btnUpdate").addEventListener('click', e=>{
  updateUserProfile();
})

function updateUserProfile() {
      var userNow = firebase.auth().currentUser;
        userNow.updateProfile({
        displayName: document.getElementById("nameInput").value
      }).then(function() {
        var displayName = userNow.displayName;
      }, function(error) {

      });
  }

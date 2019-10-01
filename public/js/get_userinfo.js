var user = firebase.auth().currentUser;
var name, email, emailVerified;

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
    } else{
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

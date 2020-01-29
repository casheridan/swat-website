// Get the modal
var modal = document.getElementById("myModal");

// Get the second modal
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById("btnRst").addEventListener("click", e=>{
  var emailAddress = $('#change_email').val();
  firebase.auth().currentUser.updateEmail(emailAddress).then(function() {
    console.log(user + "was updated");
  }).catch(function(error) {
    console.log(error);
  });
})

function reauthenticate(currentPassword) {
  var user = firebase.auth().currentUser;
  var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
}

document.getElementById("btnRst").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    var newEmail = $('#change_email').val();
    var currentPassword = $('#current-password').val();
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        console.log("Email updated!");
        window.location.reload();
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }
})

document.getElementById("current-password").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    var newEmail = $('#change_email').val();
    var currentPassword = $('#current-password').val();
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        console.log("Email updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }
})

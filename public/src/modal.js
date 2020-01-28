var auth = firebase.auth();

// Get the modal
var modal = document.getElementById("myModal");

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
  var emailAddress = $('#reset_password').val();
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    console.log("Sent password reset to: " + emailAddress);
  }).catch(function(error) {
    console.log(error);
  });
})

document.getElementById("reset_password").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    var emailAddress = $('#reset_password').val();
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      console.log("Sent password reset to: " + emailAddress);
    }).catch(function(error) {
      console.log(error);
    });
  }
})

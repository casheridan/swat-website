// Looks for the current signed in user
var user = firebase.auth().currentUser;
// Reference to the Realtime Database
var rt = firebase.database();
// Reference to the Firestore
var fs = firebase.firestore();

// Options for toastr
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

// This is used to create a new user with their password and should mostly be used with administrator privilages
// This could also be used in the future with maybe anyone can sign up and admins can set if you are a student of swat
document.getElementById("btnSignUp").addEventListener('click', e=>{
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  var valid = validateForm();
  if(valid == true) {
    console.log("valid");
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
     console.log(error.message);
    });
  }
})

// Checks if the form has all the correct information
function validateForm() {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var dispName, email, vemail, pass, vpass;
  dispName = $('input[name=dispName]').val();
  email = $('#email').val();
  vemail = $('#vemail').val();
  pass = $('#password').val();
  vpass = $('#vpassword').val();

  if(dispName == "") {
    toastr["error"]("Please enter your full name");
    return false;
  } else if(email == "" || !(re.test(String(email).toLowerCase()))) {
    toastr["error"]("Invalid email");
    return false;
  } else if(vemail == "" || vemail != email) {
    toastr["error"]("Emails are not the same");
    return false;
  } else if(pass.length < 8 || pass == "") {
    toastr["error"]("Invalid password, password must have at least 8 characters");
    return false;
  } else if(vpass != pass || vpass == "") {
    toastr["error"]("Passwords are not the same");
    return false;
  } else {
    return true;
  }
}

// When the user finally registers it calls this function and creates the necessary
// fields in firebase databases and makes a localStorage JSON blob for reference
firebase.auth().onAuthStateChanged(user=>{
  if(user){
    var name = $('#text').val();
    user.updateProfile({
      displayName: name
    }).then(function() {
      var displayName = user.displayName;
    }, function(error) {
      console.log("Couldn't update User Profile" + error.message);
    });
    var users = rt.ref('/users/' + user.uid);

    if($('input[name="studentcheck"]:checked').length > 0) {
      //Student user
      // Creates fields on the realtime database and firestore
      var times = rt.ref('/times/' + user.uid);
      users.child('clocked').set('false');
      users.child('userType').set('1');
      users.child('name').set(name);
      times.child('totalTime').set(0);
      fs.collection('users').doc(user.uid).set({
        userType: 1,
        name: name
      })
      // Creates the JSON blob reference
      obj = { uid: user.uid, userType: 1 };
      var jObj = JSON.stringify(obj);
      window.localStorage.setItem("swatuseridentification", jObj);
    } else {
      //Normal User
      // Creates fields on the realtime database and firestore
      fs.collection('users').doc(user.uid).set({
        userType: 0,
        name: name
      })
      users.child('userType').set('0');
      users.child('name').set(name);
      // Creates the JSON blob reference
      obj = { uid: user.uid, userType: 0 };
      var jObj = JSON.stringify(obj);
      window.localStorage.setItem("swatuseridentification", jObj);
    }
    // When finished go back to the main page
    setTimeout(function(){window.location.href = 'index.html'}, 500);
  }
})

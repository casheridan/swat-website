var user = firebase.auth().currentUser;
var rt = firebase.database();
var fs = firebase.firestore();

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "2600",
  "hideDuration": "1000",
  "timeOut": "2600",
  "extendedTimeOut": "1500",
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
  console.log("click");
  var valid = validateForm();
  if(valid == true) {
    console.log("valid");
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
     console.log(error.message);
    });
  }
})

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
    console.log("No name entered");
    return false;
  } else if(email == "" || !(re.test(String(email).toLowerCase()))) {
    toastr["error"]("Invalid email");
    console.log("Invalid Email");
    return false;
  } else if(vemail == "" || vemail != email) {
    toastr["error"]("Emails are not the same");
    console.log("Invalid Verify Email");
    return false;
  } else if(pass.length < 8 || pass == "") {
    console.log("Invalid Password");
    toastr["error"]("Invalid password, password must have at least 8 characters");
    return false;
  } else if(vpass != pass || vpass == "") {
    console.log("Invalid Verify Password");
    toastr["error"]("Passwords are not the same");
    return false;
  } else {
    console.log("Valid Registration");
    return true;
  }
}

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
      //Student User
      var times = rt.ref('/times/' + user.uid);
      users.child('clocked').set('false');
      users.child('userType').set('1');
      users.child('name').set(name);
      times.child('totalTime').set(0);
      fs.collection('users').doc(user.uid).set({
        userType: 1,
        name: name
      })
      obj = { uid: user.uid, userType: 1 };
      var jObj = JSON.stringify(obj);
      window.localStorage.setItem("swatuseridentification", jObj);
    } else {
      //Normal User
      fs.collection('users').doc(user.uid).set({
        userType: 0,
        name: name
      })
      users.child('userType').set('0');
      users.child('name').set(name);
      obj = { uid: user.uid, userType: 0 };
      var jObj = JSON.stringify(obj);
      window.localStorage.setItem("swatuseridentification", jObj);
    }

    setTimeout(function(){window.location.href = 'home.html'}, 500);
  }
})

// Reference to the firestore
var db = firebase.firestore();
// Reference to the realtime database
var rt = firebase.database();

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

// This is the sign in system here, it sends an observer to the console and
// the console checks the verification of the sent params and decides there
document.getElementById("btnLogin").addEventListener('click', e=>{
  const email = $('#email').val();
  const pass = $('#password').val();
  var valid = validateForm();
  if(valid == true) {
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e=>{ console.log(e.massage); toastr["error"]("Incorrect username or password")})
  }
})

// When the user hits enter in the email field, do a login check
document.getElementById("email").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e=>{ console.log(e.massage)})
  }
})

// When the user hits password in the email field, do a login check
document.getElementById("password").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e=>{ console.log(e.massage)})
  }
})

// Checks if the form is valid
function validateForm() {
  var email, pass;
  email = $('#email').val();
  pass = $('#password').val();

  if(email == "" && pass == "") {
    toastr["error"]("Please enter your email & password");
    return false;
  } else if(email == "") {
    toastr["error"]("Please enter your email");
    return false;
  } else if(pass == "") {
    toastr["error"]("Please enter your password");
    return false;
  } else {
    return true;
  }
}

// When the user signs in add the user id and its user type to a JSON blob reference
firebase.auth().onAuthStateChanged(user=>{
  if(user){
    // Shows the logged in icons
    document.getElementById("navbar-user").classList.remove('hide')
    document.getElementById("login_pic-nav").classList.add('hide')
    document.getElementById("login-nav").classList.add('hide')
    var obj;

    // Checks firestore for the signed in user
    db.collection('users').doc(user.uid).get().then(function(doc) {
      if (doc.exists) {
        // Puts the data into a JSON blob and puts it in localStorage for later use
        obj = { uid: user.uid, userType: doc.data().userType };
        var jObj = JSON.stringify(obj);
        window.localStorage.setItem("swatuseridentification", jObj);
        var _user = window.localStorage.getItem("swatuseridentification");
        var _User = JSON.parse(_user);
        // Sets the userType for the realtime database
        rt.ref('/users/' + _User.uid).child('userType').set(_User.userType);
      } else {
        db.collection('users').doc(userId).set({
          userType: 0,
          name: user.displayName
        })
      }
    })
    setTimeout(function(){window.location.href = 'index.html'}, 500)
  } else {
    // Shows the logged out icons
    document.getElementById("navbar-user").classList.add('hide')
    document.getElementById("login_pic-nav").classList.remove('hide')
    document.getElementById("login-nav").classList.remove('hide')
  }
})

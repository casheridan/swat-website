var db = firebase.firestore();
var rt = firebase.database();

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

document.getElementById("email").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e=>{ console.log(e.massage)})
  }
})

document.getElementById("password").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e=>{ console.log(e.massage)})
  }
})

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

firebase.auth().onAuthStateChanged(user=>{
  if(user){
    document.getElementById("navbar-user").classList.remove('hide')
    document.getElementById("login_pic-nav").classList.add('hide')
    document.getElementById("login-nav").classList.add('hide')
    var obj;

    db.collection('users').doc(user.uid).get().then(function(doc) {
      if (doc.exists) {
        obj = { uid: user.uid, userType: doc.data().userType };
        var jObj = JSON.stringify(obj);
        window.localStorage.setItem("swatuseridentification", jObj);
        var _user = window.localStorage.getItem("swatuseridentification");
        var _User = JSON.parse(_user);
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
    document.getElementById("navbar-user").classList.add('hide')
    document.getElementById("login_pic-nav").classList.remove('hide')
    document.getElementById("login-nav").classList.remove('hide')
  }
})

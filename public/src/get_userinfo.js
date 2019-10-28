var user = firebase.auth().currentUser;
var database = firebase.database().ref();
var name, email, emailVerified;
var userId;


toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "5000",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "5000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

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


function queryDatabase() {
  var rtn;
  var databaseRef = database.child("users").child(userId).child("clocked");
  databaseRef.on('value', function(snapshot){
    rtn = snapshot.val();
  });
  if (rtn == undefined) rtn = "false";
  return rtn;
}

function sendForm(isClockedIn) {
  var eleVal = isClockedIn == "true" ? "Clocked In" : "Clocked Out";
  document.getElementById("clocked").value = eleVal;
  database.child("users").child(userId).child("clocked").set(isClockedIn);

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxii4b_fwf9YFx4clHl1HgL7bgClAt8QGDYSk8rwe9SExR6qidg/exec'
const form = document.forms['submit_to_google_sheet']

//purpose is to determine if you are on the correct Network
// return True if on the correct Network
// return False if not on the correct Network
function isOnCorrectNetwork(){

  ipChecker.SetSubnetMask('255.255.248.0'); //cidr 21
  var bLocal1=ipChecker.isEqualToLocalIP('172.16.232.0');

  ipChecker.SetSubnetMask('255.255.252.0'); //cidr 22
  var bLocal2=ipChecker.isEqualToLocalIP('172.16.32.0');
  var bLocal3=ipChecker.isEqualToLocalIP('172.16.108.0');


  //198.209.199.248  school
  //024.031.240.002  home
  //this is to test the Public IP
  ipChecker.SetSubnetMask('255.255.255.255'); //cidr 30
  var bPublic1 = ipChecker.isEqualToPublicIP('198.209.199.248');

  ipChecker.SetSubnetMask('255.255.255.255'); //cidr 30
  var bPublic2 = ipChecker.isEqualToPublicIP('198.209.199.251');

  return ((bLocal1 || bLocal2 || bLocal3) && (bPublic1 || bPublic2));
}

function clockIn() {
  if(!isOnCorrectNetwork()){
    toastr["error"]("You cannot clockin or clockout outside of Smithville Highschool Network!  Please connect to the Highschool network to contine.");
    return;
  }

  if(queryDatabase() == "true"){
    toastr["warning"]("You are already clocked in!");

    return;
  }
    toastr["success"]("Clock In Successful");
    sendForm("true");
}

function clockOut() {
  if(!isOnCorrectNetwork()){
    toastr["error"]("You cannot clockin or clockout outside of Smithville Highschool Network!  Please connect to the Highschool network to contine.");
    return;
  }

  if(!(queryDatabase() == "true")){
    toastr["warning"]("You must clock in first");
    return;
  }
    toastr["success"]("Clock Out Successful");
    sendForm("false");
}

var user = firebase.auth().currentUser;
// Realtime database reference
var database = firebase.database().ref();
var name, email, emailVerified;
// Gets the stringified JSON blob from localStorage
var _user = window.localStorage.getItem("swatuseridentification");
// Parses stringified JSON blob into a JSON object
var _User = JSON.parse(_user);
// Sets the reference uid to the stored uid in localStorage
var userId = _User.uid;

// Does an initial query do to not getting information the first time
var result = queryDatabase();

// Toastr options
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

// This calculates the total time (time since January 1st, 1970) and puts it to normal time: days, hours, minutes
function calc(n){
  var num = n;
  var days = (num / 1440);
  var rdays = Math.floor(days);
  var hours = (days - rdays) * 24;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return time = rdays + "d " + rhours + "h " + rminutes + "m";
}

firebase.auth().onAuthStateChanged(user=>{
  if(user){
    name = user.displayName;
    email = user.email;
    emailVerified = user.emailVerified;

    // Student time score, the total time in the realtime database
    firebase.database().ref('/users/' + userId).child('name').set(user.displayName);
    if(_User.userType != 0) {
      var ref = firebase.database().ref('/times/' + userId);
      ref.once('value').then(function(snapshot) {
        $('#score').append('Your Total Time: '+calc(snapshot.val().totalTime));
      })
    }

    // Hides certain things in the form based on if the user is logged in and or verified
    document.getElementById("sendVerifyEmail").classList.add('hide');
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("btnLogOut").classList.remove('hide')
    document.getElementById("navbar-user").classList.remove('hide')
    document.getElementById("login_pic-nav").classList.add('hide')
    document.getElementById("login-nav").classList.add('hide')
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
    // User is not logged in
    console.log("Not logged in.");
    document.getElementById("btnLogOut").classList.add('hide')
    document.getElementById("navbar-user").classList.add('hide')
    document.getElementById("login_pic-nav").classList.remove('hide')
    document.getElementById("login-nav").classList.remove('hide')
  }
})

// Calls to update user profile
document.getElementById("btnUpdate").addEventListener('click', e=>{
  updateUserProfile();
})

// When any values are changed in the form send the updates to all associated databases and auth params blob
function updateUserProfile() {
      var userNow = firebase.auth().currentUser;
      userNow.updateProfile({
        displayName: document.getElementById("nameInput").value
      }).then(function() {
        var displayName = userNow.displayName;
        firebase.firestore().collection('users').doc(userId).update({
          name: userNow.displayName
        })
        firebase.database().ref('/users/' + userId).child('name').set(userNow.displayName);
        setTimeout(function(){window.location.reload(true)}, 500)
      }, function(error) {
        console.log("Couldn't update User Profile" + error.message);
      });
  }

// Logs the user out and sends them back to the home page
document.getElementById("btnLogOut").addEventListener('click', e=>{
  firebase.auth().signOut();
  console.log('logged out');
  window.location.href = 'index.html';
})

// Sends the verification email to the logged in user when called
function sendVerificationEmail() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log("Email Sent to: " + user.displayName);
  }).catch(function(error) {
    console.log(error.message);
  });
}

// Checks the value of "clocked" in the realtime database
function queryDatabase() {
  var rtn;
  var databaseRef = database.child("users").child(userId).child("clocked");
  databaseRef.on('value', function(snapshot){
    rtn = snapshot.val();
    window.localStorage.setItem("clocked", rtn);
  });
  if (rtn == undefined) {rtn = "false"}
  return rtn;
}

var dif;
// Calcualtes the clocked in and out time
// Returns the difference between the two values
function calcTime() {
  var dbUser = firebase.database().ref('/times/' + userId);

  var clockIn, clockOut;
  dbUser.once('value').then(function(snapshot){
    clockIn = snapshot.val().ciTime;
    clockOut = snapshot.val().coTime;

    dif = (clockOut - clockIn);
    dif = Math.round((dif/1000)/60);
    console.log("The difference is: " + dif);
    if (dif == null || dif == undefined || isNaN(dif)) {
       dif = 0;
    }
    console.log("The difference now is: " + dif);
    return dif;
  });
}

// Sends the values of Name, Date, Time, and Clocked value to the google spreadsheet.
function sendForm(isClockedIn) {
  var eleVal = isClockedIn == "true" ? "Clocked In" : "Clocked Out";
  document.getElementById("clocked").value = eleVal;
  database.child("users").child(userId).child("clocked").set(isClockedIn);

  fetch(scriptURL, { method: 'POST', body: new FormData(form) });
}

// Constants for the google spreadsheet
// To change the spreadsheet you must publish the sheets and have the necessary script in google scripts and the associated trigger.
const scriptURL = 'https://script.google.com/macros/s/AKfycbxii4b_fwf9YFx4clHl1HgL7bgClAt8QGDYSk8rwe9SExR6qidg/exec'
const form = document.forms['submit_to_google_sheet']

// purpose is to determine if you are on the correct Network
// return True if on the correct Network
// return False if not on the correct Network
function isOnCorrectNetwork(){
  if (userId == "d1PpKJvtcOPxFt9Z6pj4gKYY77G2") {
    return true;
  }
  ipChecker.SetSubnetMask('255.255.248.0'); //cidr 21
  var bLocal1=ipChecker.isEqualToLocalIP('172.16.232.0');

  ipChecker.SetSubnetMask('255.255.252.0'); //cidr 22
  var bLocal2=ipChecker.isEqualToLocalIP('172.16.32.0');
  var bLocal3=ipChecker.isEqualToLocalIP('172.16.108.0');

  //this is to test the Public IP
  ipChecker.SetSubnetMask('255.255.255.255'); //cidr 30
  var bPublic1 = ipChecker.isEqualToPublicIP('198.209.199.248');

  ipChecker.SetSubnetMask('255.255.255.255'); //cidr 30
  var bPublic2 = ipChecker.isEqualToPublicIP('198.209.199.251');

  return ((bLocal1 || bLocal2 || bLocal3) && (bPublic1 || bPublic2));
}

// Checks local time against server time
function checkedTime(today) {
  database.child('users').child(userId).child('sTime').set(firebase.database.ServerValue.TIMESTAMP);
  database.child('users').child(userId).once('value').then(function(snapshot){
    var time = snapshot.val().sTime;
    console.log("Server: " + time + " Local: " + today);
    var checking = time - today;
    console.log(checking);
    if (checking < 600 && checking > -600) {
      console.log("true");
      database.child("times").child(userId).child("ciTime").set(today);
      toastr["success"]("Clock In Successful");
      sendForm("true");
    } else {
      console.log("false");
      toastr["error"]("Local and Server times don't match!");
    }
  });
}

// Does a clock in check and the function
function _clockIn() {
  toastr["info"]("Clocking In...");
  ipChecker.RefreshIP();
  setTimeout(function() {
    console.log('Checking Local IP', ipChecker.GetLocalIPAddress());
    console.log('Checking Public IP', ipChecker.GetPublicIPaddress());
    // Checks if the user is on the school network
    if(!isOnCorrectNetwork()){
      toastr["error"]("You cannot clock in/out outside of SHS Network! Please connect to contine.");
      return;
    }

    let r = queryDatabase()

    if (r == "true"){
      toastr["warning"]("You are already clocked in!");
      return;
    }
    // Sets the Clocked to true and shows a toastr notif if checked server time is correct
    var today = new Date().getTime();
    checkedTime(today);
  }, 3000);
}

// Does a clock out check and the function
function _clockOut() {
  toastr["info"]("Clocking Out...");
  ipChecker.RefreshIP();
  setTimeout(function() {
    console.log('Checking Local IP', ipChecker.GetLocalIPAddress());
    console.log('Checking Public IP', ipChecker.GetPublicIPaddress());
    // Checks if the user is on the school network
    if(!isOnCorrectNetwork()){
      toastr["error"]("You cannot clock in/out outside of SHS Network! Please connect to contine.");
      return;
    }

    let r = queryDatabase()

    if(r == "false"){
      toastr["warning"]("You must clock in first");
      return;
    }
    var today = new Date();
    let dbUser = database.child("times").child(userId);
    dbUser.child("coTime").set(today.getTime());

    var clockIn, clockOut, totalTime;
    dbUser.child("totalTime").set(0);
    var _totalTime = 0;

    dbUser.on('value', function(snapshot){
      clockIn = snapshot.val().ciTime;
      clockOut = snapshot.val().ciTime;
      return totalTime = snapshot.val().totalTime;
    });

    // Sets the calculated time to firebase realtime database
    if(!(clockIn == 0) && !(clockOut == 0)) {

      calcTime();

      setTimeout(function() {
        _totalTime = totalTime + dif;
        dbUser.child("totalTime").set(_totalTime);
        setTimeout(function() {
          dbUser.child("ciTime").remove();
          dbUser.child("coTime").remove();
        }, 500)
      }, 500);
    }
    // Sets the Clocked to false and shows a toastr notif
    toastr["success"]("Clock Out Successful");
    sendForm("false");
  }, 3000);
}

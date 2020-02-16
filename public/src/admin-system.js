// Get the currently logged in user
var user = firebase.auth().currentUser;

// Gets stored JSON blob from localStorage
var jObj = window.localStorage.getItem("swatuseridentification");
// Parses JSON blob into usable object
var obj = JSON.parse(jObj);

firebase.auth().onAuthStateChanged(user=>{
    if(user){
      // If the user is signed in check permissions
      isAdmin();
      isWriter(); 
    } else {
      // If not clocked in do nothing
      return;
    }
  })

document.getElementById("adminpage").classList.add('hide');
document.getElementById("adminview").classList.add('hide');
$('#writerview').hide();
$('#writerpage').hide();

// Checks if user is an admin if userType is an admin show admin abilities
// if userType is not a student or admin (0), hide clocking system
function isAdmin(){
  if(obj.userType == 2) {
    document.getElementById("adminpage").classList.remove('hide');
    document.getElementById("adminview").classList.remove('hide');
    document.getElementById("clockIn").classList.remove('hide');
  }
  if(obj.userType == 0) {
    console.log("You are not a student or admin!");
    document.getElementById("date").style.display = "none";
    document.getElementById("time").style.display = "none";
    document.getElementById("clockIn").style.display = "none";
    document.getElementById("clockOut").style.display = "none";
  }
}

function isWriter() {
  if(obj.userType >= 2) {
    $('#writerview').show();
    $('#writerpage').show();
  }
}

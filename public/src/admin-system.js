var user = firebase.auth().currentUser;

var jObj = window.localStorage.getItem("swatuseridentification");
var obj = JSON.parse(jObj);

firebase.auth().onAuthStateChanged(user=>{
    if(user){
      isAdmin();
    } else {
      return;
    }
  })

document.getElementById("adminpage").classList.add('hide');
document.getElementById("adminview").classList.add('hide');

function isAdmin(doc){
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

var user = firebase.auth().currentUser;

var jObj = window.localStorage.getItem("swatuseridentification");
var obj = JSON.parse(jObj);

firebase.auth().onAuthStateChanged(user=>{
    if(user){
      // If there is a user logged in check permissions
      isAdmin();
    } else {
      // If user is not logged in send the user back to homepage
      window.location.href = 'index.html'
    }
});

// Checks if user is an admin or not, sends them back to homepage if not
function isAdmin(doc){
  if(obj.userType == 2){
    return;
  }
  else {
    console.log("you are not an admin");
    window.location.href = 'index.html'
  }
}

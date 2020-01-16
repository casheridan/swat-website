var user = firebase.auth().currentUser;
var db = firebase.firestore();

var jObj = window.localStorage.getItem("swatuseridentification");
var obj = JSON.parse(jObj);

firebase.auth().onAuthStateChanged(user=>{
    if(user){
      isAdmin();
    } else {
      return;
    }
});

function isAdmin(doc){
  if(obj.userType == 2){
    return;
  }
  else {
    console.log("you are not an admin");
    window.location.href = 'home.html'
  }
}

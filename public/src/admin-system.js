var user = firebase.auth().currentUser;
var db = firebase.firestore();
var userId;

firebase.auth().onAuthStateChanged(user=>{
    if(user){
      userId = user.uid;
    } else {
      return;
    }
  })

document.getElementById("adminpage").classList.add('hide');

function isAdmin(doc){
  if(doc.data().userType == 2) {
    document.getElementById("adminpage").classList.remove('hide');
    document.getElementById("clockIn").classList.remove('hide');
  }
  if(doc.data().userType == 0) {
    console.log("You are not a student or admin!");
    document.getElementById("date").style.display = "none";
    document.getElementById("time").style.display = "none";
    document.getElementById("clockIn").style.display = "none";
    document.getElementById("clockOut").style.display = "none";
  }
}

setTimeout(function() {
  db.collection('users').doc(userId).get().then(function(doc) {
    if (doc.exists) {
      isAdmin(doc);
    } else {
      db.collection('users').doc(userId).set({
        userType: 0
      })
    }
  })
}, 500);

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

function isAdmin(doc){
  if(doc.data().userType == 2){
    return;
  }
  else {
    console.log("you are not an admin");
    window.location.href = 'home.html'
  }
}

setTimeout(function() {
  db.collection('users').doc(userId).get().then(function(doc) {
    if (doc.exists) {
      isAdmin(doc);
    } else {
      console.log("How did you get here?");
      return;
    }
  })
}, 500);

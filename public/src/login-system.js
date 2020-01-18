var db = firebase.firestore();
var rt = firebase.database();

// This is the sign in system here, it sends an observer to the console and
// the console checks the verification of the sent params and decides there
document.getElementById("btnLogin").addEventListener('click', e=>{
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  promise.catch(e=>{ console.log(e.massage)})
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
    setTimeout(function(){window.location.href = 'home.html'}, 500)
  } else {
    document.getElementById("navbar-user").classList.add('hide')
    document.getElementById("login_pic-nav").classList.remove('hide')
    document.getElementById("login-nav").classList.remove('hide')
  }
})

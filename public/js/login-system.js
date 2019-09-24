// This is used to create a new user with their password and should mostly be used with administrator privilages
// This could also be used in the future with maybe anyone can sign up and admins can set if you are a student of swat
document.getElementById("btnSignUp").addEventListener('click', e=>{
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
   console.log(error.message);
  });
})

// This is the sign in system here, it sends an observer to the console and
// the console checks the verification of the sent params and decides there
document.getElementById("btnLogin").addEventListener('click', e=>{
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  promise.catch(e=>{ console.log(e.massage)})
})

// Signs the user out
document.getElementById("btnLogOut").addEventListener('click', e=>{
  firebase.auth().signOut();
  console.log('logged out')
})

firebase.auth().onAuthStateChanged(user=>{
  if(user){
    document.getElementById("btnLogOut").classList.remove('hide')
    document.getElementById("navbar-user").classList.remove('hide')
    document.getElementById("login_pic-nav").classList.add('hide')
    document.getElementById("login-nav").classList.add('hide')
  } else{
    document.getElementById("btnLogOut").classList.add('hide')
    document.getElementById("navbar-user").classList.add('hide')
    document.getElementById("login_pic-nav").classList.remove('hide')
    document.getElementById("login-nav").classList.remove('hide')
  }
})

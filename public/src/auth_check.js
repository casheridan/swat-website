// Checks if the user is logged in or not
firebase.auth().onAuthStateChanged(user=>{
  // User is logged in
  if(user){
    document.getElementById("btnLogOut").classList.remove('hide')
    document.getElementById("navbar-user").classList.remove('hide')
    document.getElementById("login_pic-nav").classList.add('hide')
    document.getElementById("login-nav").classList.add('hide')
  } else {
    // User is logged out
    document.getElementById("btnLogOut").classList.add('hide')
    document.getElementById("navbar-user").classList.add('hide')
    document.getElementById("login_pic-nav").classList.remove('hide')
    document.getElementById("login-nav").classList.remove('hide')
  }
})

// Logs the user out
document.getElementById("btnLogOut").addEventListener('click', e=>{
  firebase.auth().signOut();
  console.log('logged out')
})

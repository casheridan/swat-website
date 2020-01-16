// This is used to create a new user with their password and should mostly be used with administrator privilages
// This could also be used in the future with maybe anyone can sign up and admins can set if you are a student of swat
document.getElementById("btnSignUp").addEventListener('click', e=>{
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
   console.log(error.message);
  });
})

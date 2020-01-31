// Gets the current logged in user
var user = firebase.auth().currentUser;
// Sets firestore reference
var db = firebase.firestore();

// Gets JSON blob from localStorage
var jObj = window.localStorage.getItem("swatuseridentification");
// Parses JSON blob into usable object
var obj = JSON.parse(jObj);

// Checks if user is logged in or not, if not send back to homepage
firebase.auth().onAuthStateChanged(user=>{
    if(user){
      isAdmin();
    } else {
      window.location.href = 'index.html';
    }
});

const selectUser = document.querySelector('#selectUser');

// Renders all users in firestore
function renderUser(doc) {
  let option = document.createElement('option');
  let name = document.createElement('span');

  option.setAttribute('value', doc.id);
  name.textContent = doc.data().name;

  option.appendChild(name);

  selectUser.appendChild(option);
}

// Checks and sends all users in firestore to renderUser()
db.collection('users').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderUser(doc);
  })
});

// Checks if admin or not, sends back to homepage if not
function isAdmin(doc){
  if(obj.userType == 2){
    return;
  }
  else {
    window.location.href = 'index.html'
  }
}

// Gets the user selected in first dropdown and from firestore and selects the userType that the user is currently set as
$('#selectUser').change(function() {
  $('#selectType').show();
  db.collection('users').doc($('#selectUser').val()).get().then((snapshot) => {
    document.getElementById(snapshot.data().userType).setAttribute('selected', true);
  })
});

// When save button is clicked it takes the value of both dropdowns and updates
$('#saveChanges').click(function() {
  db.collection('users').doc($('#selectUser').val()).set({
    name: $('#selectUser').find('option:selected').text(),
    userType: $('#selectType').val()
  });
});

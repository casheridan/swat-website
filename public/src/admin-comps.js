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

const selectUser = document.querySelector('#selectUser');

function renderUser(doc) {
  let option = document.createElement('option');
  let name = document.createElement('span');

  option.setAttribute('value', doc.id);
  name.textContent = doc.data().name;

  option.appendChild(name);

  selectUser.appendChild(option);
}

db.collection('users').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderUser(doc);
  })
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

$('#selectUser').change(function() {
  $('#selectType').show();
  db.collection('users').doc($('#selectUser').val()).get().then((snapshot) => {
    document.getElementById(snapshot.data().userType).setAttribute('selected', true);
  })
});

$('#saveChanges').click(function() {
  db.collection('users').doc($('#selectUser').val()).set({
    name: $('#selectUser').find('option:selected').text(),
    userType: $('#selectType').val()
  });
});

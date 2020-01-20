var rt = firebase.database();
var selectedFile;

$('#uploadButton').hide();

$('#file').on('change', function(event){
  selectedFile = event.target.files[0];
  $('#uploadButton').show();
});

function uploadFile() {
  var filename = selectedFile.name;
  var storageRef = firebase.storage().ref('/newsletters/' + filename);
  var uploadTask = storageRef.put(selectedFile);
  
  uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      rt.ref('/newsletters/').child('url').set(downloadURL);
    });
  });
}

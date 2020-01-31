// Reference to the download url in the realtime database
var rt = firebase.database().ref('newsletters');

// Sets the pdf container to the uploaded pdf
rt.once('value').then(function(snapshot) {
  $('#pdf-container').append('<embed src="'+snapshot.val().url+'#view=Fit" type="application/pdf" width="100%" height="700px" />');
});

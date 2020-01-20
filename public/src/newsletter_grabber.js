var rt = firebase.database().ref('newsletters');

rt.once('value').then(function(snapshot) {
  $('#pdf-container').append('<embed src="'+snapshot.val().url+'#view=Fit" type="application/pdf" width="100%" height="700px" />');
});

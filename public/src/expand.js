$('.cont').hide();

function _expandCont(value) {
  if ($( "#" + value + "" ).is(':visible')) {
    $( "#" + value + "" ).hide();
  } else {
    $( "#" + value + "" ).show();
  }
}

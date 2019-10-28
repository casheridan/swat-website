'use strict';

const functions = require('firebase-functions');
var forwarded = require('forwarded-for');

exports.ipaddress = functions.https.onRequest((request, response) => {
  var address = forwarded(request, request.headers);
  response.send('{"ip":"' + address.ip + '"}');
});

var ipChecker = function() {
	var localIP='127.0.0.1';
	var publicIP='127.0.0.1';
	var globalMask = '255.255.255.255';

	function getLocalIP() {
		var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
		var pc = new myPeerConnection({iceServers: []}),
		noop = function() {},
		localIPs = {},
		ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
		key;

		function ipIterate(ip) {
			var parts=ip.split(/\./);
			if(parts.length == 4) {
				if (!localIPs[ip]) localIP = ip;
				console.log('LocaIP Change', localIP);
				localIPs[ip] = true;
			}
		}
		pc.createDataChannel(""); //create a bogus data channel
		pc.createOffer(function(sdp) {
			sdp.sdp.split('\n').forEach(function(line) {
				if (line.indexOf('candidate') < 0) return;
				line.match(ipRegex).forEach(ipIterate);
			});
			pc.setLocalDescription(sdp, noop, noop);
		}, noop); // create offer and set local description

		pc.onicecandidate = function(ice) { //listen for candidate events
			if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
			ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
		};
	}

	function getPublicIP() {
		$.getJSON("https://api.ipify.org?format=json", function(data) {
			publicIP = data.ip;
			console.log('publicIP Change', publicIP);
		});
		// var domain = window.location.url;
		// domain = domain.split(".")[0];
		// $.getJSON("//" + domain + "/ipaddress", function(data) {
		// 	publicIP = data.ip;
		// });
	}

	var assertIsIpaddr = function assertIsIpaddr(ipaddr) {
		if('string' !== typeof ipaddr && ipaddr) {
			throw new Error('ipaddr must be a non-empty string');
		}

		var parts=ipaddr.split(/\./);

		if(parts.length !== 4){
			throw new Error('ipaddr must have four octets');
		}

		var i=0;
		parts.map(function(str){
				var val=parseInt(str),
				  octet = 4 - i++;;
				if(val < 0 || val > 255){
					throw new Error('octet '+octet+' must be between 0 and 255');
				}
			});
	};

	var checkIPAddresses =  function checkIPAddresses (addr1,addr2){
		console.log('CheckIPAddresses', addr1, addr2);
		var mask = globalMask.split(".");

		assertIsIpaddr(addr1);
		assertIsIpaddr(addr2);

		var res1 = [], res2 = [];
		addr1 = addr1.split(".");
		addr2 = addr2.split(".");

		for(var i = 0,ilen = addr1.length; i <ilen ; i += 1){
			res1.push(parseInt(addr1[i]) & parseInt(mask[i]));
			res2.push(parseInt(addr2[i]) & parseInt(mask[i]));
		}
		if(res1.join(".") == res2.join(".")){
			//console.log("In the same network");
			return true;
		}else{
			//console.log("Not in the same subnet");
			return false;
		}
	};

	getLocalIP();
	getPublicIP();

	return {
		isEqualToLocalIP: function(addr) { return checkIPAddresses(localIP, addr); },
		isEqualToPublicIP: function(addr) { return checkIPAddresses(publicIP, addr); },
		GetLocalIPAddress: function() { return localIP; },
		GetPublicIPaddress: function() { return publicIP; },
		SetSubnetMask: function(subnetMask) { globalMask = subnetMask; },
		RefreshIP: function() { getLocalIP(); getPublicIP(); },
	  SetLocalIP: function(addr) { localIP=addr; },
		SetPublicIP: function(addr) { publicIP=addr; }
	}
}();

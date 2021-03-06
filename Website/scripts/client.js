function StartSocket()
{
	var socket = new WebSocket("ws://hcidev.cs.unb.ca:9999/");
	var statusLabel = document.getElementById("statusLabel");

	socket.onopen = function() {
		statusLabel.innerHTML = "Connected!";
		statusLabel.style.color = "#009933";
	};

	function ConnectionFailure() {
		statusLabel.innerHTML = "Connection failed!";
		statusLabel.style.color = "#FF0000";
	}

	socket.onmessage = function(msg) {
		var data = JSON.parse(msg.data);
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				UpdateBus(data[key]);
			}
		}
	};

	socket.onclose = ConnectionFailure;
	socket.onerror = ConnectionFailure;
}

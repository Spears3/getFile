window.onload = function () {
	var trigger = document.getElementById('trigger');
	trigger.onclick = getNewContent;
}

function getHTTPObject () {
	if (typeof XMLHttpRequest === "undefined") {
		XMLHttpRequest = function() {
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
				catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
				catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP"); }
				catch (e) {}
			return false;
		}
	}
	return new XMLHttpRequest();
}

function getNewContent () {
	var request = getHTTPObject();
	if (request) {
		// open方法的三个参数分别是，请求类型，请求文件的路径(URL 相对于执行代码的当前页面或者是绝对路径)和是否异步（布尔值）
		request.open('GET', "/files/example.txt", true);
		// 服务器给XMLHttpRequest对象送回响应的时候被触发执行
		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				// 后弹出，收到响应后才执行
				alert('Response Received!');
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById('new').appendChild(para);
			}
		};
		// 这里的send()方法接收一个参数，即要作为请求主体发送的数据。如果不需要通过请求主体发送数据，则必须传入null，因为这个参数对有些浏览器来说是必需的。调用send()之后，请求就会被分派到服务器。
		request.send(null);
	} else{
		alert('Sorry, your browser doesn\'t support XMLHttpRequest');
	}
	// 先弹出，等待响应的过程中先继续向后执行到这里
	alert('Function Done!')
}
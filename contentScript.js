let reqSign = null;
let reqOrigin = "";

(() => {
	const extensionMarker = document.createElement("div");
	extensionMarker.id = "__cors_extension_marker";
	extensionMarker.style.display = "none";
	document.documentElement.appendChild(extensionMarker);
	window.postMessage(
		{
			type: "EXTENSION_STATUS",
			bypassCors: true,
		},
		"*",
	);
})();

window.addEventListener("message", (e) => {
	if (e.data.type !== "from_web_app") return;
	const requests = e.data.payload;
	reqSign = e.data.reqSign;
	reqOrigin = e.origin;
	fetchReqToBack(requests);
});
const sendResToApp = (message, origin) => {
	window.postMessage(message, origin);
};

const fetchReqToBack = (requests) => {
	chrome.runtime.sendMessage(
		{
			action: "fetch",
			requestArr: requests,
		},
		(response) => {
			if (response.err) {
				const errorName = response.err.name;
				console.error(errorName || "Error");
				sendResToApp(
					{
						type: "from_extension",
						reqSign,
						fulfilled: false,
						message: errorName,
					},
					reqOrigin,
				);
			} else {
				sendResToApp({
					type: "from_extension",
					reqSign,
					fulfilled: true,
					payload: response.res,
				});
			}
		},
	);
};

const iconClick = () => {
	// Use Chrome tabs API instead of window.location
	chrome.tabs.create({
		url: "https://malltina-difference-calculator.vercel.app",
	});
};

if (chrome.action?.onClicked) {
	chrome.action.onClicked.addListener(iconClick);
} else {
	console.error("chrome.action.onClicked API not available");
}
let fetchSignal = new AbortController();
const fetchData = (fetchReq) => {
	return new Promise((resolve, reject) => {
		fetchSignal.abort();
		fetchSignal = new AbortController();
		const { signal } = fetchSignal;
		[url, options] = fetchReq;
		fetch(url, { ...options, signal })
			.then((res) => res.json())
			.then((res) => resolve(res))
			.catch((err) => {
				reject({
					name: err.name,
					message: err.message,
				});
			});
	});
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "fetch") {
		fetchData(request.fetchReq)
			.then((res) => sendResponse({ result: res }))
			.catch((err) => sendResponse({ err }));
		return true; // Keep channel open for async response
	}
});
// fetch("https://api.malltina.com/api/v1/asia-shop/compute-cost", {
//     "headers": {
//       "content-type": "application/json"
//     },
//     "body": "{\"country\":\"uae\",\"price\":\"80\",\"weight\":150}",
//     "method": "POST"
//   })

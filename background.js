const iconClick = () => {
    console.log("icon is clicked");
    // Use Chrome tabs API instead of window.location
    chrome.tabs.create({
        url: "https://malltina-difference-calculator.vercel.app",
    });
};

// Add listener AFTER checking API availability
if (chrome.action?.onClicked) {
    chrome.action.onClicked.addListener(iconClick);
} else {
    console.error("chrome.action.onClicked API not available");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetch") {
        console.log(...request.fetchReq);
        fetch(...request.fetchReq)
            .then((res) => res.json())
            .then((res) => sendResponse({ result: res }))
            .catch((error) => sendResponse({ error }));
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

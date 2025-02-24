const iconClick = () => {
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
const fetchData = (requestArr) => {
    return new Promise((resolve, reject) => {
        fetchSignal.abort();
        fetchSignal = new AbortController();
        const { signal } = fetchSignal;
        Promise.all(
            requestArr.map(([url, options]) =>
                fetch(url, { ...options, signal })
            )
        )
            .then(async (res) => {
                const resArr = await Promise.all(
                    res.map((result) => result.json())
                );
                return resArr;
            })
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
        console.log(request.requestArr);
        fetchData(request.requestArr)
            .then((res) => sendResponse({ result: res }))
            .catch((err) => sendResponse({ err }));
        return true; // Keep channel open for async response
    }
});

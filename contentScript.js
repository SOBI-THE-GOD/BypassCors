function FetchBody(country, price, weight) {
    this.country = country;
    this.price = price;
    this.weight = weight;
}
const fetchReq = [
    "https://api.malltina.com/api/v1/asia-shop/compute-cost",
    {
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(new FetchBody("china", "80", 600)),
        method: "POST",
    },
];
chrome.runtime.sendMessage(
    {
        action: "fetch",
        fetchReq,
    },
    (response) => {
        if (response.error) {
            console.error("Error:", response.error);
        } else {
            console.log("Computed amount:", response.result);
        }
    }
);

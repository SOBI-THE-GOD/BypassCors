document
    .querySelector("#root")
    .insertAdjacentHTML("beforeend", '<button class="btn">fetch</button>');

document.querySelector(".btn").addEventListener("click", () => {
    chrome.runtime.sendMessage(
        {
            action: "fetch",
            requestArr: AsiaFetchRequest,
        },
        (response) => {
            if (response.err) {
                console.error(response.err.name || "Error");
                console.error(response.err.message || "Error Message !");
            } else {
                console.log("Computed amount:", response.result);
            }
        }
    );
});
document.addEventListener("fetchBC", (e) => {
    alert("khello" + e.detail?.name);
});
function computeAsiaFetch(fetchBody) {
    return [
        "https://api.malltina.com/api/v1/asia-shop/compute-cost",
        {
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(fetchBody),
            method: "POST",
        },
    ];
}
function AsiaFetchBody(country, price, weight) {
    this.country = country;
    this.price = price;
    this.weight = weight;
}
const reqArray = [
    ["china", "30", 700],
    ["uae", "80", 900],
];
const makeRequest = (reqArray, requestBuilder, BodyBuilder) => {
    return reqArray.map((req) => {
        return requestBuilder(new BodyBuilder(...req));
    });
};

const AsiaFetchRequest = makeRequest(reqArray, computeAsiaFetch, AsiaFetchBody);

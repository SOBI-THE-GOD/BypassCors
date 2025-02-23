document
	.querySelector("#root")
	.insertAdjacentHTML("beforeend", '<button class="btn">fetch</button>');

document.querySelector(".btn").addEventListener("click", (e) => {
	chrome.runtime.sendMessage(
		{
			action: "fetch",
			fetchReq,
		},
		(response) => {
			if (response.err) {
				console.error(response.err.name || "Error");
			} else {
				console.log("Computed amount:", response.result);
			}
		},
	);
});
document.addEventListener("fetchBC", (e) => {
	alert("khello" + e.detail?.name);
});
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

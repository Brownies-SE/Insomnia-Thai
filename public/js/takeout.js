let contentStorage = [];
let menu = [
  "Chocolate Martini",
  "Summer Breeze Martini",
  "Sweet Heat Margarita",
  "Fried Shrimp",
  "Tuscan Bruschetta",
  "Fat Tuesday Salad",
  "Braised Bonless Beef Short Ribs",
  "Jambalaya",
  "Stuffed Jumbo Shrimp",
];
let price = [10, 9, 9, 9.95, 8.95, 17.95, 25.95, 15.95, 12.95];
let totalPrice = 0;

const addToOrder = (event) => {
  const itemID = event.target.getAttribute("data-id");
  contentStorage.push(menu[itemID]);
  totalPrice += price[itemID];
  console.log(contentStorage);
  console.log(totalPrice);
};

const submitOrder = async (res, req) => {
  contents = contentStorage.join(",");
  price = totalPrice.toFixed(2);
  const response = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify({ contents, price }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/api/orders/renderOrd");
  } else {
    alert("Failed to Submit Order.");
  }
};

//add event listeners to all item buttons
document.querySelectorAll(".btn-primary").forEach((item) => {
  item.addEventListener("click", addToOrder);
});

//add event listener for order submit button
document.getElementById("order-button").addEventListener("click", submitOrder);

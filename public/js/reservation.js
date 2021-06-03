const reservationFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("emailInput").value.trim();
  const phone = document.getElementById("phoneNumber").value.trim();
  const date_of_res = document.getElementById("resDate").value.trim();
  const time = document.getElementById("resTime").value.trim();
  const people = document.getElementById("numPeople").value.trim();
  const message = document.getElementById("resMessage").value.trim();

  console.log(email, phone, date_of_res, time, people, message);
  console.log("click");
  if (email && date_of_res && time) {
    const response = await fetch("/api/reservations", {
      method: "POST",
      body: JSON.stringify({
        email,
        phone,
        date_of_res,
        time,
        people,
        message,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/api/reservations/renderRes");
    } else {
      alert("Failed to reserve a table.");
    }
  }
};

document
  .getElementById("sbtBtn")
  .addEventListener("click", reservationFormHandler);

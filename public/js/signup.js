const signUpFormHandler = async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log(name, email, phone, password);
  console.log("click");
  if (name && email && phone && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to add user.");
    }
  }
};

document.getElementById("sbtBtn").addEventListener("click", signUpFormHandler);

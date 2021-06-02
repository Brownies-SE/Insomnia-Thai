const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  console.log(email, password);
  console.log("click");
  if (email && password) {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

document.getElementById("sbtBtn").addEventListener("click", loginFormHandler);

// JS/loadheader.js

document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      // Dynamically import header.js AFTER header is injected
      const script = document.createElement("script");
      script.src = "JS/header.js";
      script.onload = () => {
        if (typeof initHeaderScripts === "function") {
          initHeaderScripts(); // 🧠 NOW call your init function
        }
      };
      document.body.appendChild(script);
    })
    .catch(err => console.error("Header load error:", err));
});

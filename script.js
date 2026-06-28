function checkDomain(){

    const name = document.getElementById("domainInput").value.trim();

    if(name === ""){
        alert("Enter a domain name.");
        return;
    }

    document.getElementById("result").innerHTML =
        "✅ Available: " + name + ".freedomains.net";
}


async function signup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.message || data.error;
}




async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        alert("Logged in!");
        window.location.href = "dashboard.html";
    } else {
        alert(data.error);
    }
}

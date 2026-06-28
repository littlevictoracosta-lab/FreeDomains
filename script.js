function checkDomain(){

    const name = document.getElementById("domainInput").value.trim();

    if(name === ""){
        alert("Enter a domain name.");
        return;
    }

    document.getElementById("result").innerHTML =
        "✅ Available: " + name + ".freedomains.net";
}


function signup() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
        document.getElementById("msg").innerText = "⚠️ Fill in all fields";
        return;
    }

    // Temporary fake signup (we'll connect database later)
    localStorage.setItem("user", JSON.stringify({
        username,
        email
    }));

    document.getElementById("msg").innerText =
        "✅ Account created! Go to login or dashboard soon.";
}

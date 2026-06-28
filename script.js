function checkDomain(){

    const name = document.getElementById("domainInput").value.trim();

    if(name === ""){
        alert("Enter a domain name.");
        return;
    }

    document.getElementById("result").innerHTML =
        "✅ Available: " + name + ".freedomains.net";
}

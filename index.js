const token = "NDMyMTU4NDE1NTI4Mzk0NzYy.GUv1qK.MTcroq1kMKmWIJNTw744PhQ4T9HgqdQeCnSxlc";
const name = "Sahazel";
const headers = {"Content-Type": "application/json", "Authorization": token};

(async function validate() {
        const res = await fetch("https://discord.com/api/v9/users/@me", {method: "GET", headers})
        if (res.status !== 200) throw new Error("Invalid Token")
    })()
const requested = async (timeout) => {
    const response = await fetch("https://discord.com/api/v10/users/@me/pomelo", {
        method: "POST", body: JSON.stringify({username: name}), headers
    });

    if (response.status === 200) {
        console.log("%cYou Got Your Username", "color:green");
        clearTimeout(timeout);
    } else if (response.status === 429) {
        console.log("%cGot Rate limited", "color:orange");
    } else {
        console.log(`%c${response.statusText}`, "color:Red");
    }
}

(function recursive() {
    const rand = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
    const timeout = setTimeout(async () => {
        await requested(timeout);
        recursive();
    }, rand + Math.floor(Math.random() * 3000))
})();

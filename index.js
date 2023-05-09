const token = "";
const name = "";
const headers = {
    "Content-Type": "application/json",
    "Authorization": token
};
const sleep = (time) => new Promise((res) => setTimeout(res,time));
(async function validate() {
    const res = await fetch("https://discord.com/api/v9/users/@me", {
        method: "GET",
        headers
    })
    if (res.status !== 200) throw new Error("Invalid Token")
    else console.log("Token Validated!")
})();
(async () => {
        for (let i = 0; i < Infinity; i++) {
            const response = await fetch("https://discord.com/api/v10/users/@me/pomelo", {
                method: "POST",
                body: JSON.stringify({
                    username: name
                }),
                headers
            }).catch(()=>{});
            if (!response) continue;
            switch(response.status){
                case 200 :
                    console.log("%cYou Got Your Username", "color:green");
                    return
                case 429 :
                    console.log("%cGot Rate limited", "color:orange");
                    console.log(((+response.headers.get("Retry-After") + 2) * 1000))
                    await sleep((+response.headers.get("Retry-After") + 2) * 1000)
                    break
                case 400 :
                    console.log(`%c${response.statusText} : Username may be Taken or BlackListed`, "color:Red");
                    return
                case 401 :
                    console.log(`%c${response.statusText} : Username is Available and will be claimed once feature is rolled out for user`, "color:Red");
                    break
                default :
                    console.log(`%c${response.statusText}`, "color:Red");
            }
            await sleep(15000)
        }
    }
)()

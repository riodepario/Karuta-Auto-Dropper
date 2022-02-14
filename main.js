const discordClient = require("./discordClient.js")
const WebSocket = require("ws")


const wss = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json")

ids = ["PLACEHOLDER FOR TOKEN", "PLACEHOLDER FOR TOKEN", "PLACEHOLDER FOR TOKEN", "PLACEHOLDER FOR TOKEN", "PLACEHOLDER FOR TOKEN", "PLACEHOLDER FOR TOKEN"]

payload = {
    op: 2,
    d: {
        token: "ANY VALID USER TOKEN",
        properties: {
            $os: "windows",
            $browser: "brave",
            $device: "brave"
        }
    }
}


wss.on("open", function open() {
    wss.send(JSON.stringify(payload))
})

const heartbeat = (ms) => {
    return setInterval(() => {
        console.log("badump!")
        wss.send(JSON.stringify({op: 1, d: null}))
    }, ms)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const droppers = []

for (var id of ids) {
    droppers.push(new discordClient(id))
}

wss.on("message", function incoming(data) {
    let payload = JSON.parse(data)
    const {t, event, op, d} = payload
        
    switch(op) {
        case 10:
            const {heartbeat_interval} = d
            interval = heartbeat(heartbeat_interval)
            break
    }
            
    switch(t) {
        case "MESSAGE_CREATE":
            let content = d.content.toLowerCase()
            if (content.includes("menacing spoon") == true) {
                droppers[2].inform("a bot just claimed the menacing spoon card")
            } else if (content.includes("is dropping 3 cards") == true) {
                console.log("a drop has occurred")
            }
            //console.log(content)
            break
    } 
})



const startup = async() => {

    try {
        for(let i = 3; i < Infinity; i++) {
            if (i >= 6) {
                i = 3
            }
            const msgId = await droppers[i].drop();
            await sleep(5000);
            droppers[3].claim(msgId);
            droppers[4].claim(msgId);
            droppers[5].claim(msgId);
            await sleep(10000);
        }
    }
    
    catch (err) {
        console.log(err)
    }
}

startup()

//theoretically this works, but not the way i want it to
//also dont use your main laptop as a makeshift server please

//sincerely, Me
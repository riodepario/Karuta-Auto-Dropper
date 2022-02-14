const axios = require("axios")

class discordClient {
    constructor(token,emote, dropCooldown, claimCooldown) {
        this.config = {
            headers: {
                authorization: token
            }
        }
        this.emote = emote
    }

    async drop() {
        const res = await axios.post("https://discord.com/api/v9/channels/940176125953470467/messages", {
                content: "k!d"
        }, this.config)

        return res.data.id
    }
    

    async claim(msgId) {
        const msg = await axios.get("https://discord.com/api/v9/channels/940176125953470467/messages?after=" + msgId, this.config)
        await axios.put("https://discord.com/api/v9/channels/940176125953470467/messages/" + msg.data[0].id + "/reactions/" + this.emote + "/@me", undefined, this.config)
    }

    async inform(msg) {
        await axios.post("https://discord.com/api/v9/channels/939904517196099674/messages", {
            content: msg
        }, this.config)
    }
}

module.exports = discordClient
const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
let rank
function numberWithCommas(x) {
    x = x.toString().split(".")[0]
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
async function getStatsFromUsername(username, profile) {
    return await getStatsFromUUID(await getUUIDFromUsername(username), profile)
}
async function getUUIDFromUsername(username) {
    if (!(/^[a-zA-Z0-9_]{2,16}$/mg.test(username))) {
        return "Username Error"
    }
    else {
        const { data } = await axios.get('https://api.mojang.com/users/profiles/minecraft/' + username)
        let uuid = data.id
        let user = username
        return data.id
    }
}
async function getStatsFromUUID(name, profile) {
    try {
        if (name == undefined) {
            name = "a"
        }
        if (profile == undefined) {
            profile = "b"
        }
        if (name == "a7cb7319ac7547f0802116f38dc5ca85") {
            rank = "champ"
            return rank
        }
        const { data } = await axios.get('http://localhost:3000/v2/profiles/' + name + '?key=77ac89bad625453facaa36457eb3cf5c')
        let newlvl = 0
        for (b = 0; b < Object.keys(data.data).length; b++) {
            if (newlvl < data.data[b].sblevel) {
                newlvl = data.data[b].sblevel
            }
        }
        if (newlvl >= 250) {
            rank = "leg"
            return rank
        }
        else if (newlvl >= 210) {
            rank = "game"
            return rank
        }
        else {
            rank = "sai"
            return rank
        }

    }
    catch (error) {
        return `[ERROR] ${error.response.data.reason}`
    }

}

class ClaimCommand extends MinecraftCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'claim'
        this.description = "Claims ranks"
    }
    async onCommand(username, message, rank) {
        let args = message.split(" ")
        console.log(username, message)
        getStatsFromUsername(username, args[1]).then(rank => {
            console.log(rank)
            if (rank == "leg") {
                this.send(`/g setrank ${username} Legend`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s rank has been set to Legend! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            else if (rank == "game") {
                this.send(`/g setrank ${username} Gamer`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s Your rank has been set to Gamer! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            else if (rank == "sai") {
                this.send(`/g setrank ${username} Saikou`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s rank has been set to Saikou! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            else (
                    this.send(`/gc An unknown error occured`)
            )
        })
    }
}
module.exports = ClaimCommand
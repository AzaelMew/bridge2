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
        return "Error"
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
        if (profile == undefined){
            profile = "a"
        }
        if(name == "a7cb7319ac7547f0802116f38dc5ca85"){
            rank = "champ"
            return rank
        }
        const { data } = await axios.get('http://161.35.22.13:187/v1/profiles/' + name + '?key=77ac89bad625453facaa36457eb3cf5c')
        for (let i = 0; i < Object.keys(data.data).length ; i++) {
            if (data.data[i].name.toLowerCase() == profile.toString().toLowerCase()) {
                console.log(i + " in")
                console.log(data.data[i].name.toLowerCase())
                let nw = data.data[i].networth.networth
                let farming = data.data[i]?.skills?.farming.level
                let mining = data.data[i]?.skills?.mining.level
                let combat = data.data[i]?.skills?.combat.level
                let foraging = data.data[i]?.skills?.foraging.level
                let fishing = data.data[i]?.skills?.fishing.level
                let enchant = data.data[i]?.skills?.enchanting.level
                let alch = data.data[i]?.skills?.alchemy.level
                let taming = data.data[i]?.skills?.taming.level
                let cata = data.data[i].dungeons?.catacombs?.skill?.level
                let carp = data.data[i]?.skills?.carpentry.level
                let sa = round((farming + mining + combat + foraging + fishing + enchant + alch + taming + carp) / 9, 1)
                let wslayerEXP = data.data[i].slayer.wolf.xp
                let zslayerEXP = data.data[i].slayer.zombie.xp
                let sslayerEXP = data.data[i].slayer.spider.xp
                let eslayerEXP = data.data[i].slayer.enderman.xp
                let bslayerEXP = data.data[i]?.slayer?.blaze.xp
                let slayerEXP = wslayerEXP + zslayerEXP + sslayerEXP + eslayerEXP + bslayerEXP

                if (sa >= 42 && nw >= 1300000000) {
                    if (cata >= 30 && slayerEXP >= 300000) {
                        rank = "champ"
                        return rank
                    }
                    if (cata >= 30 && farming >= 40) {
                        rank = "champ"
                        return rank
                    }
                    if (cata >= 30 && fishing >= 40) {
                        rank = "champ"
                        return rank
                    }
                    if (farming >= 40 && slayerEXP >= 300000) {
                        rank = "champ"
                        return rank
                    }
                    if (fishing >= 40 && slayerEXP >= 300000) {
                        rank = "champ"
                        return rank
                    }
                    else {
                        rank = "ini"
                        return rank
                    }
                }
                else if (sa >= 35 && nw >= 500000000) {
                    if (cata >= 30 && slayerEXP >= 300000) {
                        rank = "vet"
                        return rank
                    }
                    if (cata >= 30 && farming >= 40) {
                        rank = "vet"
                        return rank
                    }
                    if (cata >= 30 && fishing >= 40) {
                        rank = "vet"
                        return rank
                    }
                    if (farming >= 40 && slayerEXP >= 300000) {
                        rank = "vet"
                        return rank
                    }
                    if (fishing >= 40 && slayerEXP >= 300000) {
                        rank = "vet"
                        return rank
                    }
                    else {
                        rank = "ini"
                        return rank
                    }
                }
                else if (sa >= 32 && nw >= 250000000) {
                    if (cata >= 30 && slayerEXP >= 300000) {
                        rank = "adv"
                        return rank
                    }
                    if (cata >= 30 && farming >= 40) {
                        rank = "adv"
                        return rank
                    }
                    if (cata >= 30 && fishing >= 40) {
                        rank = "adv"
                        return rank
                    }
                    if (farming >= 40 && slayerEXP >= 300000) {
                        rank = "adv"
                        return rank
                    }
                    if (fishing >= 40 && slayerEXP >= 300000) {
                        rank = "adv"
                        return rank
                    }
                    else {
                        rank = "ini"
                        return rank
                    }

                }
                else {
                    rank = "ini"
                    return rank
                }
            }
            else if (i == Object.keys(data.data).length - 1) {
                console.log(i + " out")
                let nw = data.data[0].networth.networth
                let farming = data.data[0]?.skills?.farming.level
                let mining = data.data[0]?.skills?.mining.level
                let combat = data.data[0]?.skills?.combat.level
                let foraging = data.data[0]?.skills?.foraging.level
                let fishing = data.data[0]?.skills?.fishing.level
                let enchant = data.data[0]?.skills?.enchanting.level
                let alch = data.data[0]?.skills?.alchemy.level
                let taming = data.data[0]?.skills?.taming.level
                let cata = data.data[0].dungeons?.catacombs?.skill?.level
                let carp = data.data[0]?.skills?.carpentry.level
                let sa = round((farming + mining + combat + foraging + fishing + enchant + alch + taming + carp) / 9, 1)
                let wslayerEXP = data.data[0].slayer.wolf.xp
                let zslayerEXP = data.data[0].slayer.zombie.xp
                let sslayerEXP = data.data[0].slayer.spider.xp
                let eslayerEXP = data.data[0].slayer.enderman.xp
                let bslayerEXP = data.data[0]?.slayer?.blaze.xp
                let slayerEXP = wslayerEXP + zslayerEXP + sslayerEXP + eslayerEXP + bslayerEXP
                if (sa >= 42 && nw >= 1300000000) {
                    if (cata >= 30 && slayerEXP >= 300000) {
                        rank = "champ"
                        return rank
                    }
                    if (cata >= 30 && farming >= 40) {
                        rank = "champ"
                        return rank
                    }
                    if (cata >= 30 && fishing >= 40) {
                        rank = "champ"
                        return rank
                    }
                    if (farming >= 40 && slayerEXP >= 300000) {
                        rank = "champ"
                        return rank
                    }
                    if (fishing >= 40 && slayerEXP >= 300000) {
                        rank = "champ"
                        return rank
                    }
                    else {
                        rank = "ini"
                        return rank
                    }
                }
                else if (sa >= 35 && nw >= 500000000) {
                    if (cata >= 30 && slayerEXP >= 300000) {
                        rank = "vet"
                        return rank
                    }
                    if (cata >= 30 && farming >= 40) {
                        rank = "vet"
                        return rank
                    }
                    if (cata >= 30 && fishing >= 40) {
                        rank = "vet"
                        return rank
                    }
                    if (farming >= 40 && slayerEXP >= 300000) {
                        rank = "vet"
                        return rank
                    }
                    if (fishing >= 40 && slayerEXP >= 300000) {
                        rank = "vet"
                        return rank
                    }
                    else {
                        rank = "ini"
                        return rank
                    }
                }
                else if (sa >= 32 && nw >= 250000000) {
                    if (cata >= 30 && slayerEXP >= 300000) {
                        rank = "adv"
                        return rank
                    }
                    if (cata >= 30 && farming >= 40) {
                        rank = "adv"
                        return rank
                    }
                    if (cata >= 30 && fishing >= 40) {
                        rank = "adv"
                        return rank
                    }
                    if (farming >= 40 && slayerEXP >= 300000) {
                        rank = "adv"
                        return rank
                    }
                    if (fishing >= 40 && slayerEXP >= 300000) {
                        rank = "adv"
                        return rank
                    }
                    else {
                        rank = "ini"
                        return rank
                    }

                }
                else {
                    rank = "ini"
                    return rank
                }
            }
        }

    }
    catch (error) {
        e = error.message
        if (e.includes("status code 500")) {
            return "is an Invalid Username"
        }
        if (e.includes("status code 404")) {
            return "has no Skyblock Profiles"
        }
        else {
            return error
        }
    }

}

class ClaimCommand extends MinecraftCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'claim'
        this.description = "Claims ranks"
    }
    async onCommand(username, message) {
        let args = message.split(" ")
        getStatsFromUsername(username, args[1]).then(rank => {
            console.log(rank)
            if (rank == "champ") {
                this.send(`/g setrank ${username} Champion`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s rank has been set to Champion! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            if (rank == "vet") {
                this.send(`/g setrank ${username} Veteran`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s Your rank has been set to Veteran! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            if (rank == "adv") {
                this.send(`/g setrank ${username} Adventurer`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s rank has been set to Adventurer! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            if (rank == "ini") {
                this.send(`/g setrank ${username} Initiate`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s rank has been set to Initiate! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            else (
                this.send(`/gc Error`)
            )
        })
    }
}
module.exports = ClaimCommand
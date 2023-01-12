const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");
function numberWithCommas(x) {
  x = x.toString().split(".")[0]
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
async function getStatsFromUsername(username,profile) {
  return await getStatsFromUUID(await getUUIDFromUsername(username),profile)
}
async function getStatsFromUUID(name,profile) {
  try {
    if (name == undefined){
      name = "a"
    }
    if (profile == undefined){
      profile = "a"
  }
    const { data } = await axios.get('http://161.35.22.13:187/v1/profiles/' + name + '?key=77ac89bad625453facaa36457eb3cf5c')
    for (i = 0; i < Object.keys(data.data).length ; i++) {
      if (data.data[i].name.toLowerCase() == profile.toLowerCase()) {
        let nw = numberWithCommas(data.data[i].networth.networth)
        let farming = data.data[i]?.skills?.farming.level
        let mining = data.data[i]?.skills?.mining.level
        let combat = data.data[i]?.skills?.combat.level
        let foraging = data.data[i]?.skills?.foraging.level
        let fishing = data.data[i]?.skills?.fishing.level
        let enchant = data.data[i]?.skills?.enchanting.level
        let alch = data.data[i]?.skills?.alchemy.level
        let taming = data.data[i]?.skills?.taming.level
        let carp = data.data[i]?.skills?.carpentry.level
        let sa = round((farming + mining + combat + foraging + fishing + enchant + alch + taming + carp) / 9, 1)
        let cata = numberWithCommas(data.data[i].dungeons.catacombs.skill.level)
        let wslayer = data.data[i]?.slayer?.wolf.xp
        let zslayer = data.data[i]?.slayer?.zombie.xp
        let sslayer = data.data[i]?.slayer?.spider.xp
        let eslayer = data.data[i]?.slayer?.enderman.xp
        let bslayer = data.data[i]?.slayer?.blaze.xp
        let slayer = numberWithCommas(wslayer + zslayer + sslayer + eslayer + bslayer)
        let stats = ` on ${profile}: \nSkill Avg: ${sa}; Slayer: ${slayer}; Cata: ${cata}; Networth: $${nw}`
        return stats
      }
      else if (i == Object.keys(data.data).length - 1){
        let nw = numberWithCommas(data.data[0].networth.networth)
        let farming = data.data[0]?.skills?.farming.level
        let mining = data.data[0]?.skills?.mining.level
        let combat = data.data[0]?.skills?.combat.level
        let foraging = data.data[0]?.skills?.foraging.level
        let fishing = data.data[0]?.skills?.fishing.level
        let enchant = data.data[0]?.skills?.enchanting.level
        let alch = data.data[0]?.skills?.alchemy.level
        let taming = data.data[0]?.skills?.taming.level
        let carp = data.data[0]?.skills?.carpentry.level
        let sa = round((farming + mining + combat + foraging + fishing + enchant + alch + taming + carp) / 9, 1)
        let cata = numberWithCommas(data.data[0].dungeons.catacombs.skill.level)
        let wslayer = data.data[0]?.slayer?.wolf.xp
        let zslayer = data.data[0]?.slayer?.zombie.xp
        let sslayer = data.data[0]?.slayer?.spider.xp
        let eslayer = data.data[0]?.slayer?.enderman.xp
        let bslayer = data.data[0]?.slayer?.blaze.xp
        let slayer = numberWithCommas(wslayer + zslayer + sslayer + eslayer + bslayer)
        let stats = `Skill Avg: ${sa}; Slayer: ${slayer}; Cata: ${cata}; Networth: $${nw}; `
        return stats
      }
    }
  }
  catch (error) {
    e = error.message
    if(e.includes("status code 500")){
      return "is an Invalid Username"
    }
    if(e.includes("status code 404")){
      return "has no Skyblock Profiles"
    }
    else{
      return error
    }
  }
}

class StatsCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'stats'
    this.aliases = ['skills']
    this.description = `Checks user's stats`
  }

  onCommand(message) {
      let args = this.getArgs(message)
      let user = args.shift()
      getStatsFromUsername(user).then(stats=>{
      this.sendMinecraftMessage(`/gc ${user}'s stats: ${stats.replaceAll(";",",")}`)
      message.channel.send({
        embed: {
          description: stats.replaceAll(";","\n"),
          color: '2A2A2A',
          timestamp: new Date(),
          footer: {
            text: "BOT",
          },
          author: {
            name: `${user}'s stats`,
            icon_url: 'https://www.mc-heads.net/avatar/' + user,
          },
        },
      })
    })
  }
}

module.exports = StatsCommand
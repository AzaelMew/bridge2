const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");
function numberWithCommas(x) {
  if (x > 999815672) {
    x = x.toString().split(".")[0]
    x = x.toString().slice(0, -6) + "815672";
  }
  else {
    x = x.toString().split(".")[0]
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
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
async function getSkillsFromUsername(username) {
  return await getSkillsFromUUID(await getUUIDFromUsername(username))
}
async function getSkillsFromUUID(name) {
  try {
    if (name == undefined) {
      name = "a"
    }
    const { data } = await axios.get('http://161.35.22.13:187/v1/profiles/' + name + '?key=77ac89bad625453facaa36457eb3cf5c')

    let farming = data.data[0]?.skills?.farming.level
    let mining = data.data[0]?.skills?.mining.level
    let combat = data.data[0]?.skills?.combat.level
    let foraging = data.data[0]?.skills?.foraging.level
    let fishing = data.data[0]?.skills?.fishing.level
    let enchant = data.data[0]?.skills?.enchanting.level
    let alch = data.data[0]?.skills?.alchemy.level
    let carp = data.data[0]?.skills?.carpentry.level
    let rune = data.data[0]?.skills?.runecrafting.level
    let soci = data.data[0]?.skills?.social.level
    let taming = data.data[0]?.skills?.taming.level

    let sa = round((farming + mining + combat + foraging + fishing + enchant + alch + taming + carp) / 9, 1)

    let skills = `**Skill Avg**:\n➣ ${sa}; **Farm**:\n➣ ${farming}; **Mine**:\n➣ ${mining}; **Comb**:\n➣ ${combat}; **Forage**:\n➣ ${foraging}; **Fish**:\n➣ ${fishing}; **Ench**:\n➣ ${enchant}; **Alch**:\n➣ ${alch}; **Carp**:\n➣ ${carp}; **Rune**:\n➣ ${rune}; **Soci**:\n➣ ${soci}; **Taming**:\n➣ ${taming}; `
    return skills
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



class SkillsCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'skills'
    this.description = `Checks user's location`
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    getSkillsFromUsername(user).then(skills => {
      this.sendMinecraftMessage(`/gc ${user}'s skills: ${skills.replaceAll(";", ",").replaceAll("*", "").replaceAll("\n➣ ", "").replaceAll("\n", "")}`)
      message.channel.send({
        embed: {
          description: skills.replaceAll("; ", "\n").replaceAll(":", ""),
          color: '2A2A2A',
          timestamp: new Date(),
          footer: {
            text: "BOT",
          },
          author: {
            name: `${user}'s skills`,
            icon_url: 'https://www.mc-heads.net/avatar/' + user,
          },
        },
      })
    })
  }
}

module.exports = SkillsCommand
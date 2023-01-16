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
async function getDungeonFromUsername(username) {
  return await getDungeonFromUUID(await getUUIDFromUsername(username))
}
async function getDungeonFromUUID(name) {
  try {
    if (name == undefined) {
      name = "a"
    }
    const { data } = await axios.get('http://161.35.22.13:187/v1/profiles/' + name + '?key=77ac89bad625453facaa36457eb3cf5c')
    let secrets = data.data[0]?.dungeons.secrets_found
    let lvl = data.data[0].dungeons?.catacombs?.skill?.levelWithProgress
    let h = data.data[0].dungeons?.classes?.healer?.levelWithProgress
    let m = data.data[0].dungeons?.classes?.mage?.levelWithProgress
    let b = data.data[0].dungeons?.classes?.berserk?.levelWithProgress
    let a = data.data[0].dungeons?.classes?.archer?.levelWithProgress
    let t = data.data[0].dungeons?.classes?.tank?.levelWithProgress
    let av = ((h + m + b + a + t) / 5)

    let stats = "**Cata**: \n➣ " + lvl.toFixed(2) + " **;Average**: \n➣ " + av.toFixed(2) + " **;Archer**: \n➣ " + a.toFixed(2) + " **;Berserk**: \n➣ " + b.toFixed(2) + " **;Healer**: \n➣ " + h.toFixed(2) + " **;Mage**: \n➣ " + m.toFixed(2) + " **;Tank**: \n➣ " + t.toFixed(2) + " **;Secrets**: \n➣ " + numberWithCommas(secrets)
    return stats

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
class CatacombsCommand extends DiscordCommand {
  constructor(discord) {
      super(discord)

      this.name = 'cata'
      this.description = "Says users dungeon stats"
    }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    getDungeonFromUsername(user).then(stats => {
      this.sendMinecraftMessage(`/gc ${user}'s cata: ${stats.replaceAll("*", "").replaceAll("\n➣ ", "").replaceAll("\n", "").replaceAll(" ;", ",")}`)
      message.channel.send({
        embed: {
          description: stats.replaceAll(";", "\n").replaceAll(":",""),
          color: '2A2A2A',
          timestamp: new Date(),
          footer: {
            text: "BOT",
          },
          author: {
            name: `${user}'s cata`,
            icon_url: 'https://www.mc-heads.net/avatar/' + user,
          },
        },
      })
    })
  }
}

module.exports = CatacombsCommand
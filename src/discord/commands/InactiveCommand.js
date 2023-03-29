const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");
let kickables = []

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
async function getUsernameFromUUID(uuid) {
    const { data } = await axios.get('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid)
    let username = data.name
    return username
}
async function getGMemberFromUUID(uuid, message) {
  try {
    if (uuid == undefined) {
      uuid = "a"
    }
    const { data } = await axios.get('https://api.hypixel.net/guild?key=4fd2ea22-23ec-4543-9141-01288a80adfb&player=' + uuid)
    try {
      if (data.guild.name_lower != "tempestsky") {
        let ret = "This player is not in our guild."
        return ret
      }
    }
    catch {
      let ret = "Please confirm the name of the player you're trying to look up."
      return ret
    }
    if (data.guild.name_lower != "tempestsky") {
      let ret = "This player is not in our guild."
      return ret
    }
    else {
      let targetUUID
      targetUUID = uuid
      let name
      kickables = []
      for (i = 0; i < data.guild.members.length + 1; i++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        if (i <= data.guild.members.length - 1) {
          try {
            getActivity(data.guild.members[i].uuid, message)
          }
          catch {
            console.log("fuck you azael.")
          }
        }
        else if (i == data.guild.members.length) {
          for (s = 0; s < 100; s++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            if (s == 100) {
              return
            }
          }
        }
      }
    }
  }
  catch (error) {
    e = error.message
    if (e.includes("status code 500")) {
      return "Error has occured"
    }
    if (e.includes("status code 404")) {
      return "Error has occured"
    }
    else {
      return error
    }
  }
}
async function getActivity(uuid, message) {
  try {
    const { data } = await axios.get(`https://api.hypixel.net/player?uuid=${uuid}&key=4fd2ea22-23ec-4543-9141-01288a80adfb`)
    let lastLogin = data.player.lastLogin
    if (data.player.displayname == "Rioiyo" || data.player.displayname == "YesPleases" || data.player.displayname == "zabbir" || data.player.displayname == "Frindlo" || data.player.displayname == "Nico_the_Creator" || data.player.displayname == "WhenCarrot" || data.player.displayname == "Legendaryspirits" || data.player.displayname == "MistyTM" || data.player.displayname == "Meir231" || data.player.displayname == "Azael_Nyaa") return
    if (new Date().getTime() - lastLogin > 2160000000) {
      kickables.push(data.player.displayname)
      console.log(kickables)
      return kickables
    }
  }
  catch {
    return
  }

}
async function getGMemberFromUsername(username, message) {
  return await getGMemberFromUUID(await getUUIDFromUsername(username), message)
}
class InactiveCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'kickinactive'
    this.description = 'Kicks inactive people.'
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    kickables = []
    getGMemberFromUsername("xephor_ex", message).then(kickabes => {
      let interval = 750; // how much time should the delay between two iterations be (in milliseconds)?
      for (let index = 0; index < kickables.length; ++index) {
        let el = kickables[index]
        setTimeout(() => {
          this.sendMinecraftMessage(`/g kick ${el} Kicked due to inactivity, you're free to re apply once you're active.`)
        }, index * interval);
      };
    })
    message.channel.send({
      embeds: [{
        description: `Kicking inactive users...`,
        color: '47F049'
      }
    })
  }
}
module.exports = InactiveCommand
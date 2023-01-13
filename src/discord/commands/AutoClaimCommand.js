const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");
let ini = []
let adv = []
let vet = []
let champ = []
async function getUUIDFromUsername(username) {
  if (!(/^[a-zA-Z0-9_]{2,16}$/mg.test(username))) {
    return "Error"
  }
  else {
    const { data } = await axios.get('https://api.mojang.com/users/profiles/minecraft/' + username)
    return data.id
  }
}
async function getGMemberFromUUID(uuid, message) {
  try {
    if (uuid == undefined) {
      uuid = "a"
    }
    const { data } = await axios.get('https://api.hypixel.net/guild?key=0897c9a2-68d5-4040-a0a4-deaa283b1495&player=' + uuid)
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
      ini = []
      adv = []
      vet = []
      champ = []
      for (i = 0; i < data.guild.members.length + 2; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(i)
        if (i <= data.guild.members.length - 1) {
          try {
            getActivity(data.guild.members[i].uuid, message)
          }
          catch {
            console.log("fuck you azael.")
          }
        }
        if (i == data.guild.members.length) {
          return ini
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
  const { data } = await axios.get('http://161.35.22.13:187/v1/profiles/' + uuid + '?key=77ac89bad625453facaa36457eb3cf5c')

  let sblvl = data.data[0]?.sblevel

  if (sblvl >= 225) {
    champ.push(data.data[0].username)
    return
  }
  else if (sblvl >= 185) {
    vet.push(data.data[0].username)
    return
  }
  else if (sblvl >= 150) {
    adv.push(data.data[0].username)
    return
  }
  else {
    ini.push(data.data[0].username)
    return
  }
}

async function getGMemberFromUsername(username, message) {
  return await getGMemberFromUUID(await getUUIDFromUsername(username), message)
}
class AutoclaimCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'autoclaim'
    this.description = 'Kicks inactive people.'
  }

  onCommand(message) {
    getGMemberFromUsername("xephor_ex", message).then(ini => {
      let interval = 750; // how much time should the delay between two iterations be (in milliseconds)?
      for (let index = 0; index < ini.length; ++index) {
        let el = ini[index]
        setTimeout(() => {
          this.sendMinecraftMessage(`/g setrank ${el} Initiate`)
        }, index * interval);
      };
      for (let index = 0; index < adv.length; ++index) {
        let el = kickables[index]
        setTimeout(() => {
          this.sendMinecraftMessage(`/g setrank ${el} Adventurer`)
        }, index * interval);
      };
      for (let index = 0; index < vet.length; ++index) {
        let el = kickables[index]
        setTimeout(() => {
          this.sendMinecraftMessage(`/g setrank ${el} Veteran`)
        }, index * interval);
      };
      for (let index = 0; index < champ.length; ++index) {
        let el = kickables[index]
        setTimeout(() => {
          this.sendMinecraftMessage(`/g setrank ${el} Champion`)
        }, index * interval);
      };
    })
    message.channel.send({
      embed: {
        description: `Checking peoples ranks...`,
        color: '47F049'
      }
    })
  }
}
module.exports = AutoclaimCommand
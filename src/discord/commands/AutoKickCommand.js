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
            getActivity(data.guild.members[i].uuid, data.guild.members[i].rank)
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
async function getActivity(uuid, rank) {
  const { data } = await axios.get('http://192.168.100.197:3000/v1/profiles/' + uuid + '?key=77ac89bad625453facaa36457eb3cf5c')
  if (data.data[0].username == "notbudi" || data.data[0].username == "Invictyus" || data.data[0].username == "Jasqer" || data.data[0].username == "Vallekoen" || data.data[0].username == "YesPleases" || data.data[0].username == "zabbir" || data.data[0].username == "Frindlo" || data.data[0].username == "Morithos_" || data.data[0].username == "Nico_the_Creator" || data.data[0].username == "Mizzty" || data.data[0].username == "WhenCarrot" || data.data[0].username == "Gyaro" || data.data[0].username == "Legendaryspirits" || data.data[0].username == "MistyTM" || data.data[0].username == "Movzes" || data.data[0].username == "Dachichan" || data.data[0].username == "Meir231" || data.data[0].username == "Azael_Nyaa") return
  let newlvl = 0
  for (b = 0; b < Object.keys(data.data).length; b++) {
  if(newlvl < data.data[b].sblevel){
    newlvl = data.data[b].sblevel
  }
  }
  if(rank=="Elder") return
  if(rank=="Guild Master") return

  if (newlvl < 125) {
    ini.push(`${data.data[0].username} + ${newlvl}`)
    return
  }
  else{
    return
  }
}

async function getGMemberFromUsername(username, message) {
  return await getGMemberFromUUID(await getUUIDFromUsername(username), message)
}
class AutoKickCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'autokick'
    this.description = 'Kicks people who do not meet the requirements.'
  }

  onCommand(message) {
    getGMemberFromUsername("xephor_ex", message).then(ini => {
      let cat = 0
      let cat2 = 0
      let cat3 = 0
      let interval = 750; // how much time should the delay between two iterations be (in milliseconds)?
      for (let index = 0; index < ini.length; ++index) {
        let el = ini[index]
        setTimeout(() => {
          console.log(el)
          /*this.sendMinecraftMessage(`/g kick ${el}`)*/
        }, index * interval);
      }
    })
    message.channel.send({
      embed: {
        description: `Let the purge... **BEGIN!**`,
        color: '47F049'
      }
    })
  }
}
module.exports = AutoKickCommand
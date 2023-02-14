const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");
let ini = []
let adv = []
let vet = []
let champ = []
let done = false
let lengthss = 0
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
        if (i <= data.guild.members.length - 1) {
          try {
            //getActivity(data.guild.members[i].uuid, data.guild.members[i].rank)
            adv.push(`${data.guild.members[i].uuid} ${data.guild.members[i].rank}`)
          }
          catch {
            console.log("fuck you azael.")
          }
        }
      }
      let lengthss = adv.length
      for (let kissaperkele = 0; kissaperkele < adv.length; ++kissaperkele) {
        await new Promise(resolve => setTimeout(resolve, 100));
        let sel = adv[kissaperkele]
        let cat = sel.split(" ")
        getActivity(cat[0],cat[1])
      };
      while(done){
        done = false
        return ini
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
  console.log(data.data[0].username, rank)
  let newlvl = 0
  
  for (b = 0; b < Object.keys(data.data).length; b++) {
    if (b>=lengthss) done = true
  if(newlvl < data.data[b].sblevel){
    newlvl = data.data[b].sblevel
  }
  }
  if(rank=="Elder") return
  if(rank=="Guild Master") return

  if (newlvl >= 230) {
    if(rank=="Champion") return
    ini.push(`${data.data[0].username} Champion`)
    console.log(data.data[0].username + "champ")

    return
  }
  else if (newlvl >= 190) {
    if(rank=="Knight") return
    ini.push(`${data.data[0].username} Knight`)
    console.log(data.data[0].username + "knight")

    return
  }
  else if (newlvl >=160) {
    if(rank=="Squire") return
    ini.push(`${data.data[0].username} Squire`)
    console.log(data.data[0].username + "squ")

    return
  }
  else {
    if(rank=="Recruit") return
    ini.push(`${data.data[0].username} Recruit`)
    console.log(data.data[0].username + "rec")

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
      let cat = 0
      let cat2 = 0
      let cat3 = 0
      let interval = 750; // how much time should the delay between two iterations be (in milliseconds)?
      for (let index = 0; index < ini.length; ++index) {
        let el = ini[index]
        setTimeout(() => {
          console.log(el)
          this.sendMinecraftMessage(`/g setrank ${el}`)
        }, index * interval);
      }
    })
    message.channel.send({
      embed: {
        description: `Checking skyblock levels...`,
        color: '47F049'
      }
    })
  }
}
module.exports = AutoclaimCommand
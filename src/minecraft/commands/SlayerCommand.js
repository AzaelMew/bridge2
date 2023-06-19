const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
function numberWithCommas(x) {
  if(x>999815672){
    x = x.toString().split(".")[0]
    x = x.toString().slice(0, -6) + "815672";
  }
  else{
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
async function getSlayerFromUser(username) {
  return await getSlayerFromUUID(await getUUIDFromUsername(username))
}
async function getSlayerFromUUID(name){
    try{
      if (name == undefined){
        name = "a"
      }
      const { data } = await axios.get('http://localhost:3000/v1/profiles/'+name+'?key=77ac89bad625453facaa36457eb3cf5c')
    let wslayerEXP = data.data[0].slayer.wolf.xp
    let zslayerEXP = data.data[0].slayer.zombie.xp
    let sslayerEXP = data.data[0].slayer.spider.xp
    let eslayerEXP = data.data[0].slayer.enderman.xp
    let bslayerEXP = data.data[0]?.slayer?.blaze.xp
    let slayerEXP = numberWithCommas(wslayerEXP+zslayerEXP+sslayerEXP+eslayerEXP+bslayerEXP)
    let wslayerLVL = data.data[0].slayer.wolf.level
    let zslayerLVL = data.data[0].slayer.zombie.level
    let sslayerLVL = data.data[0].slayer.spider.level
    let eslayerLVL = data.data[0].slayer.enderman.level
    let bslayerLVL = data.data[0]?.slayer?.blaze.level
    let stats = `**Total Slayer EXP**:\n➣  ${slayerEXP} ;**Zombie level**:\n➣  ${zslayerLVL} - ${numberWithCommas(zslayerEXP)}xp ;**Spider level**:\n➣  ${sslayerLVL} - ${numberWithCommas(sslayerEXP)}xp ;**Wolf level**:\n➣  ${wslayerLVL} - ${numberWithCommas(wslayerEXP)}xp ;**Enderman level**:\n➣  ${eslayerLVL} - ${numberWithCommas(eslayerEXP)}xp ;**Blaze level**:\n➣  ${bslayerLVL} - ${numberWithCommas(bslayerEXP)}xp`
    return stats
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

class SlayerCommand extends MinecraftCommand {
    constructor(minecraft) {
      super(minecraft)
  
      this.name = 'slayer'
      this.aliases = "slayers"

      this.description = "Says users slayers"
      this.CommType = "Statcheck"
    }
  
    async onCommand(username, message) {
      let args = message.split(" ")
      if (message.endsWith("!slayer") || message.endsWith("!slayers")){
        getSlayerFromUser(username).then(stats=>{
            this.send(`/gc ${username}'s slayers: ${stats.replaceAll(";","").replaceAll("\n","").replaceAll("*","").replaceAll("➣","")}`)
            this.minecraft.broadcastCommandEmbed({ username: `${username}'s slayers`, message: `${stats.replaceAll(";", "\n")}` }) })
    }
      else {
        getSlayerFromUser(args[1]).then(stats=>{
            this.send(`/gc ${args[1]}'s slayers: ${stats.replaceAll(";","").replaceAll("\n","").replaceAll("*","").replaceAll("➣","")}`)
            this.minecraft.broadcastCommandEmbed({ username: `${args[1]}'s slayers`, message: `${stats.replaceAll(";", "\n").replaceAll(":","")}` })})
      }
    }
  }
  
  module.exports = SlayerCommand
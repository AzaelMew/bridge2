const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
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
function numberWithCommas(x) {
  try {
    if (x > 999815672) {
      x = x.toString().split(".")[0]
      x = x.toString().slice(0, -6) + "815672";
    }
    else {
      x = x.toString().split(".")[0]
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  catch {
    return "API Off"
  }
}
async function getNetworthFromUsername(username) {
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
async function getNetworthFromUsername(username) {
  return await getNetworthFromUUID(await getUUIDFromUsername(username))
}
async function getNetworthFromUUID(name) {
  try {
    if (name == undefined) {
      name = "a"
    }


    const { data } = await axios.get("http://192.168.100.197:3000/v2/profiles/" + name + "?key=77ac89bad625453facaa36457eb3cf5c")
    let total = data.data[0]?.networth?.networth ?? 0
    let purse = data.data[0]?.purse ?? 0
    let bank = data.data[0]?.bank ?? 0
    let ret
    let armor = data.data[0]?.networth?.types?.armor?.total ?? 0
    let wardrobe = data.data[0]?.networth?.types?.wardrobe?.total ?? 0
    let inventory = data.data[0]?.networth?.types?.inventory?.total ?? 0
    let ec = data.data[0]?.networth?.types?.enderchest?.total ?? 0
    let storage = data.data[0]?.networth?.types?.storage?.total ?? 0
    let pets = data.data[0]?.networth?.types?.pets?.total ?? 0
    let acc = data.data[0]?.networth?.types?.accessories?.total ?? 0
    let equ = data.data[0]?.networth?.types?.equipment?.total ?? 0

    let storageec

    storageec = ec + storage
    ret = "**Total**:\n➣ $" + numberWithCommas(total) + ". **Purse:**\n➣ $" + numberWithCommas(purse) + ". **Bank:**\n➣ $" + numberWithCommas(bank) + ". **Armor:**\n➣ $" + numberWithCommas(armor) + ". **Equipment:**\n➣ $" + numberWithCommas(equ) + ". **Wardrobe:**\n➣ $" + numberWithCommas(wardrobe) + ". **Inv:**\n➣ $" + numberWithCommas(inventory) + ". **Storage:**\n➣ $" + numberWithCommas(storageec) + ". **Pets:**\n➣ $" + numberWithCommas(pets) + ". **Talis:**\n➣ $" + numberWithCommas(acc)
    return ret

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
class NetworthCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'networth'
    this.aliases = ['nw']
    this.description = "Says users networth"
  }

  async onCommand(username, message) {
    let args = message.split(" ")
    if (message.endsWith("!nw")) {
      getNetworthFromUsername(username).then(nw => {
        this.send(`/gc Networth: ${nw.replaceAll("\n", "").replaceAll("*","").replaceAll("➣","")}`)
        this.minecraft.broadcastCommandEmbed({ username: `${username}'s networth`, message: `${nw.replaceAll(".", "\n")}` })

      })
    }
    else if (message.endsWith("!networth")) {
      getNetworthFromUsername(username).then(nw => {
        this.send(`/gc Networth: ${nw.replaceAll("\n", "").replaceAll("*","").replaceAll("➣","")}`)
        this.minecraft.broadcastCommandEmbed({ username: `${username}'s networth`, message: `${nw.replaceAll(".", "\n")}` })

      })
    }
    else {
      getNetworthFromUsername(args[1]).then(nw => {
        this.send(`/gc Networth: ${nw.replaceAll("\n", "").replaceAll("*","").replaceAll("➣","")}`)
        this.minecraft.broadcastCommandEmbed({ username: `${args[1]}'s networth`, message: `${nw.replaceAll(".", "\n")}` })

      })
    }
  }
}

module.exports = NetworthCommand
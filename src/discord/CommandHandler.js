const fs = require('fs')
const { Collection } = require('discord.js')

class CommandHandler {
  constructor(discord) {
    this.discord = discord

    this.prefix = discord.app.config.discord.prefix

    this.commands = new Collection()
    let commandFiles = fs.readdirSync('./src/discord/commands').filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
      const command = new (require(`./commands/${file}`))(discord)
      this.commands.set(command.name, command)
    }
  }

  handle(message) {
    if (!message.content.startsWith(this.prefix)) {
      return false
    }

    let args = message.content.slice(this.prefix.length).trim().split(/ +/)
    let commandName = args.shift().toLowerCase()

    let command = this.commands.get(commandName)
      || this.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) {
      return false
    }

    if (this.isOwner(message.author)){
      this.discord.app.log.discord(`[${command.name}] ${message.content}`)
      command.onCommand(message)

      return true

    }
    else{
      if (command.name == "override" && !this.isMod(message.member)){
        return message.channel.send({
          embeds: [{
            description: `You don't have permission to do that.`,
            color: 0xDC143C
          }]
        })
      }
      else if (command.name == "help" || command.name == "top" || command.name == "online"|| command.name == "stalk"|| command.name == "stats"|| command.name == "skills"|| command.name == "cata"|| command.name == "networth"|| command.name == "joke"|| command.name == "contest"|| command.name == "seen"|| command.name == "render"|| command.name == "slayer"){
        this.discord.app.log.discord(`[${command.name}] ${message.content}`)
        command.onCommand(message)
  
        return true
      }
      else if (!this.isCommander(message.member)){
        return message.channel.send({
          embeds: [{
            description: `You don't have permission to do that.`,
            color: 0xDC143C
          }]
        })
      }
      else{
        this.discord.app.log.discord(`[${command.name}] ${message.content}`)
        command.onCommand(message)
  
        return true
      }
    }
  }

  isCommander(member) {
    return member.roles.cache.find(r => r.id == this.discord.app.config.discord.commandRole)
  }
  isMod(member) {
    return member.roles.cache.find(r => r.id == this.discord.app.config.discord.modRole)
  }
  isOwner(member) {
    return member.id == this.discord.app.config.discord.ownerId
  }
}

module.exports = CommandHandler

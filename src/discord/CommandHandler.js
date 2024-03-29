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
    let commandRole = command.reqRole
    let able_to_run = (command.name == 'help') || ((commandRole == "User" && this.isUser(message.member)) || (commandRole == "Staff" && this.isCommander(message.member)))
    if (!able_to_run || (command.name == 'override' && !this.isOwner(message.author))) {
      return message.channel.send({
        embeds: [{
          description: `You don't have permission to do that.`,
          color: 0xDC143C
        }]
      })
    }

    this.discord.app.log.discord(`[${command.name}] ${message.content}`)
    command.onCommand(message)

    return true
  }
  isUser(member){
    return member.roles.cache.find(r => r.id == this.discord.app.config.discord.userRole) || member.roles.cache.find(r => r.id == this.discord.app.config.discord.memberRole)
  }
  
  isCommander(member) {
    return member.roles.cache.find(r => r.id == this.discord.app.config.discord.commandRole)
  }

  isOwner(member) {
    return member.id == this.discord.app.config.discord.ownerId || member.id == this.discord.app.config.discord.ownerId2
  }
}

module.exports = CommandHandler

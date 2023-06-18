const DiscordCommand = require('../../contracts/DiscordCommand')

const { version } = require('../../../package.json')

class HelpCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'help'
    this.aliases = ['h', 'info']
    this.description = 'Shows this help menu'
  }

  onCommand(message) {
    let discordCommands = []
    let minecraftCommands = []
    
    let discordCommands_Staff_Only = []
    let discordCommands_General = []
    let discordCommands_Guild_Admin = []
    let discordCommands_Progression = []
    
    let minecraftCommands_General = []
    let minecraftCommands_Progression = []
    let minecraftCommands_Guild_Admin = []
    let minecraftCommands_Statcheck = []
    
    
    
    this.discord.messageHandler.command.commands.forEach(command => {
      if(command.CommType == "General"){
        discordCommands_General.push(`\`${command.name}\`: ${command.description}`)
      }
      if(command.CommType == "Staff Only"){
        discordCommands_Staff_Only.push(`\`${command.name}\`: ${command.description}`)
      }
      if(command.CommType == "Guild Admin"){
        discordCommands_Guild_Admin.push(`\`${command.name}\`: ${command.description}`)
      }
      if(command.CommType == "Progression"){
        discordCommands_Progression.push(`\`${command.name}\`: ${command.description}`)
      }
      
      //discordCommands.push(`\`${command.name}\`: ${command.description}`)
    })

    this.discord.app.minecraft.chatHandler.command.commands.forEach(command => {
      if(command.CommType == "Guild Admin"){
        minecraftCommands_Guild_Admin.push(`\`${command.name}\`: ${command.description}`)
      }
      else if(command.CommType == "Statcheck"){
        minecraftCommands_Statcheck.push(`\`${command.name}\`: ${command.description}`)
      }
      else {
          minecraftCommands_General.push(`\`${command.name}\`: ${command.description}`)
      }
    })

    message.channel.send({
      embeds: [{
        title: 'Bridge Commands',
        description: 'Chat with people in-game and gain access to a variety of commands to use!!\n\n',
        fields: [
          {
            name: 'Discord Commands - Staff Only',
            value: discordCommands_Staff_Only.join('\n')
          },
          {
            name: 'Discord Commands - Guild Admin',
            value: discordCommands_Guild_Admin.join('\n')
          },
          {
            name: 'Discord Commands - Progression',
            value: discordCommands_Progression.join('\n')
          },
          {
            name: 'Discord Commands - General',
            value: discordCommands_General.join('\n')
          },
          {
            name: 'Minecraft Commands - Guild Admin',
            value: minecraftCommands_Guild_Admin.join('\n')
          },
          {
            name: 'Minecraft Commands - Statcheck',
            value: minecraftCommands_Statcheck.join('\n')
          },
          {
            name: 'Minecraft Commands - General',
            value: minecraftCommands_General.join('\n')
          },
          {
            name: `Info`,
            value: [
              `Prefix: \`${this.discord.app.config.discord.prefix}\``,
              `Guild Channel: <#${this.discord.app.config.discord.channel}>`,
              `Command Role: <@&${this.discord.app.config.discord.commandRole}>`,
              `User Role: <@&${this.discord.app.config.discord.userRole}> or <@&${this.discord.app.config.discord.memberRole}>`,
              `Version: \`${version}\``,
            ].join('\n'),
          }
        ],
        color: 0x2eebf4,
        footer: {
          text: 'Made by Azael & Marshelix'
        },
        timestamp: new Date()
      }], 
    })
  }
}

module.exports = HelpCommand

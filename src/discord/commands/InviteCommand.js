const DiscordCommand = require('../../contracts/DiscordCommand')

class InviteCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'invite'
    this.aliases = ['i', 'inv']
    this.description = 'Invites the given user to the guild'
    this.reqRole = "Staff"
    this.CommType = "Staff Only"

  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    console.log(user)
    this.sendMinecraftMessage(`/g invite ${user ? user : ''}`)
  }
}

module.exports = InviteCommand

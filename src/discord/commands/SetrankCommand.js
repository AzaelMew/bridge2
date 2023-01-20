const DiscordCommand = require('../../contracts/DiscordCommand')

class SetrankCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'setrank'
    this.description = `Sets provided user to provded rank`
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    let rank = args.shift()
    console.log(user, rank)
    if (rank = "ini"){
      rank = "Initiate"
    }
    if (rank = "adv"){
      rank = "Adventurer"
    }
    if (rank = "vet"){
      rank = "Veteran"
    }
    if (rank = "champ"){
      rank = "Champion"
    }
    this.sendMinecraftMessage(`/g setrank ${user ? user : ''} ${rank ? rank: ''}`)
  }
}

module.exports = SetrankCommand

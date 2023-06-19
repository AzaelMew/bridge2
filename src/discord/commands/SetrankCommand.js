const DiscordCommand = require('../../contracts/DiscordCommand')

class SetrankCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'setrank'
    this.description = `Sets provided user to provded rank`
    this.CommType = "Guild Admin"
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    let rank = args.shift()
    if (rank.toLowerCase() == "sup"){
      rank = "Superior"
    }
    if (rank.toLowerCase() == "leg"){
      rank = "Legend"
    }
    if (rank.toLowerCase() == "gamer"){
      rank = "Gamer"
    }
    if (rank.toLowerCase() == "saikou"){
      rank = "Saikou"
    }
    console.log(user, rank)
    this.sendMinecraftMessage(`/g setrank ${user ? user : ''} ${rank ? rank: ''}`)
  }
}

module.exports = SetrankCommand

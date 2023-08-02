const MinecraftCommand = require('../../contracts/MinecraftCommand')

class ReqsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'reqs'
    this.aliases = []
    this.description = 'Tells the guild requirements'
  }

  onCommand(username, message) {
    this.send(`/gc Rank Requirements; Gamer - Skyblock Level 235 | Legend - Skyblock Level 280 | Superior - Top 5 SB lvl in guild`)
  }
}

module.exports = ReqsCommand

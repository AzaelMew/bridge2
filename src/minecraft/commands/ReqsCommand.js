const MinecraftCommand = require('../../contracts/MinecraftCommand')

class ReqsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'reqs'
    this.aliases = []
    this.description = 'Reqs'
  }

  onCommand(username, message) {
    this.send(`/gc Rank Requirements; Adventurer - Skyblock Level 150 | Veteran - Skyblock Level 185 | Champion - Skyblock Level 225`)
  }
}

module.exports = ReqsCommand

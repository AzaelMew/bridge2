const MinecraftCommand = require('../../contracts/MinecraftCommand')

class ReqsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'reqs'
    this.aliases = []
    this.description = 'Reqs'
  }

  onCommand(username, message) {
    this.send(`/gc Rank Requirements; Squire - Skyblock Level 160 | Knight - Skyblock Level 190 | Champion - Skyblock Level 230`)
  }
}

module.exports = ReqsCommand

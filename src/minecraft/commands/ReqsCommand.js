const MinecraftCommand = require('../../contracts/MinecraftCommand')

class ReqsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'reqs'
    this.aliases = []
    this.description = 'Reqs'
  }

  onCommand(username, message) {
    this.send(`/gc Rank Requirements; Recruit - Skyblock Level 150 | Knight - Skyblock Level 190 | Champion - Skyblock Level 240`)
  }
}

module.exports = ReqsCommand

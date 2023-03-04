const MinecraftCommand = require('../../contracts/MinecraftCommand')

class ReqsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'reqs'
    this.aliases = []
    this.description = 'Reqs'
  }

  onCommand(username, message) {
    this.send(`/gc Rank Requirements; Recruit - Skyblock Level 135 | Knight - Skyblock Level 170 | Champion - Skyblock Level 230`)
  }
}

module.exports = ReqsCommand

const MinecraftCommand = require('../../contracts/MinecraftCommand')

class ReqsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'reqs'
    this.aliases = []
    this.description = 'Reqs'
  }

  onCommand(username, message) {
    this.send(`/gc Rank Requirements; Adventurer - SA 32 & 250 Million Networth | Veteran - SA 35 & 500 Million Networth | Champion - SA 42 & Networth 1.3 Billion Networth`)
  }
}

module.exports = ReqsCommand

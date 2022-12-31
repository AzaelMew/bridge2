const MinecraftCommand = require('../../contracts/MinecraftCommand')

class FragCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'join'
    this.aliases = ['joinme','frag']
    this.description = 'Joins users party'
  }

  onCommand(username, message) {
    this.send(`/p join ${username}`)
  }
}

module.exports = FragCommand

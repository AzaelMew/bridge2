const MinecraftCommand = require('../../contracts/MinecraftCommand')

class NyaCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'nya'
    this.aliases = ["nyah","meow","mew"]
    this.description = 'Gives needed welcome info'
  }

  onCommand(username, message) {

    this.send(`/gc ${username} Nyah~`)

  }
}

module.exports = NyaCommand
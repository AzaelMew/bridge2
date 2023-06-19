const MinecraftCommand = require('../../contracts/MinecraftCommand')

async function ask() {
    let eightball = [
        "heads",
        "tails"
    ];
    let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
    return eightball[index]


}
class CointossCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'cointoss'
    this.aliases = ["coinflip","cf"]
    this.description = 'cointosses'
  }

  onCommand(username, message) {
    ask().then(ans => {
        setTimeout(() => {
            this.send(`/gc The coin landed on.. ${ans}!`)
        }, 600);
      })
  }
}

module.exports = CointossCommand

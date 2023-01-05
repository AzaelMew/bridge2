const MinecraftCommand = require('../../contracts/MinecraftCommand')

async function ask() {
    let eightball = [
        "heads",
        "tails"
    ];
    let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
    return eightball[index]


}
class EightBallCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = '8ball'
    this.description = '8ball'
  }

  onCommand(username, message) {
    ask().then(ans => {
        setTimeout(() => {
            this.send(`/gc The coin landed on.. ${ans}!`)
        }, 600);
      })
  }
}

module.exports = EightBallCommand

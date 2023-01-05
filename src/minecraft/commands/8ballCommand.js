const MinecraftCommand = require('../../contracts/MinecraftCommand')

async function ask() {
    let eightball = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        "Don't count on it.",
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.',
        'No way.',
        'Maybe',
        'The answer is hiding inside you',
        'No.',
        'Depends on the mood of the RNGesus',
        'No',
        'Yes',
        'Hang on',
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
            this.send(`/gc ${ans}`)
        }, 1000);
      })
  }
}

module.exports = EightBallCommand

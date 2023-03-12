const DiscordCommand = require('../../contracts/DiscordCommand')

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
        "Don't count on it.",
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.',
        'No way.',
        'Maybe',
        'No.',
        'Depends on the mood of the RNGesus',
        'No',
        'Yes',
        "Ask shana",
    ];
    let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
    return eightball[index]


}
class EightBallCommand extends DiscordCommand {
  constructor(Discord) {
    super(Discord)

    this.name = '8ball'
    this.description = '8ball'
  }

  onCommand(username, message) {
    let channel = message.channel
    ask().then(ans => {
        setTimeout(() => {
          message.channel.send({
            embed: {
              description: ans,
              color: '2A2A2A',
              timestamp: new Date(),
              footer: {
                text: "BOT",
              },
              author: {
                name: `The Magic 8 Ball`,
                icon_url: 'https://cdn.discordapp.com/attachments/1045517755044085762/1084545786886504508/mlfaJuO.png',
              },
            },
          })
        }, 1000);
      })
  }
}

module.exports = EightBallCommand

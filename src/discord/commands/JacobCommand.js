const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");
function convertSecondsToMinutesAndSeconds(milliseconds) {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    //let seconds = milliseconds;
    //let minutes = Math.floor(seconds / 60);
    //seconds = Math.floor(seconds % 60);
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
   }
   return result;
}
async function getJacobs() {
    const { data } = await axios.get("https://dawjaw.net/jacobs")
    for (jEvent of data) {
        let currentTime = Date.now();
        let eventTime = jEvent['time'] * 1000;
        if (currentTime < eventTime) {
            let delta = eventTime - currentTime;
            let timeUntilJacobEvent = convertSecondsToMinutesAndSeconds(delta);
            let eventString = [];
            jEvent['crops'].forEach((crop) => {
                eventString.push(crop);
            });
            let contest = `The next contest starts in: ${timeUntilJacobEvent}\n\nCrops: \n- ${eventString.toString().replaceAll(",",", ")}`
            return contest
        }
    }
}
class JacobCommand extends DiscordCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'contest'

        this.description = "Says users stats"
    }

    onCommand(message) {
        let args = this.getArgs(message)
        let crop = args.shift()
        console.log(crop)
        getJacobs().then(contest => {
            message.channel.send({
                embed: {
                    description: contest.replaceAll(", ","\n- ").replaceAll("Crops:","**Crops:**").replaceAll("The next contest starts in:","**The next contest starts in:**\n"),
                    color: 'cbbeb5',
                    timestamp: new Date(),
                    footer: {
                        text: "BOT",
                    },
                },
            })
            this.sendMinecraftMessage(`/gc ${contest.replaceAll("\n- ","").replaceAll("\n\n"," ┃ ").replaceAll("- ","")}`)
        })
    }
}

module.exports = JacobCommand
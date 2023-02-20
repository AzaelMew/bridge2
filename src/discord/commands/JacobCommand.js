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
            let contest = `The next contest starts in: ${timeUntilJacobEvent}\nCrops: \n\n- ${eventString.toString().replaceAll(",",", ")}`
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
        getJacobs().then(contest => {
            message.channel.send({
                embed: {
                    description: contest.replaceAll(", ","\n- "),
                    color: 'cbbeb5',
                    timestamp: new Date(),
                    footer: {
                        text: "BOT",
                    },
                    author: {
                        name: `Next Jacob's contest`,
                    },
                },
            })
            this.sendMinecraftMessage(`/gc ${contest.replaceAll("\n\n- ","").replaceAll("\n"," ┃ ").replaceAll("- ","")}`)
        })
    }
}

module.exports = JacobCommand
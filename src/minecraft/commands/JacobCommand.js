const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
function convertSecondsToMinutesAndSeconds(milliseconds) {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    //let seconds = milliseconds;
    //let minutes = Math.floor(seconds / 60);
    //seconds = Math.floor(seconds % 60);
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
function convertSecondsToHoursMinutesAndSeconds(milliseconds) {
    var hours = Math.floor(milliseconds / 3600000);
    var minutes = Math.floor((milliseconds % 3600000) / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return (hours > 0 ? (hours < 10 ? "0" : "") + hours + ":" : "") + 
           (minutes < 10 ? "0" : "") + minutes + ":" + 
           (seconds < 10 ? "0" : "") + seconds;
}
async function capitalizeFirstLetter(string) {
    string = string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
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
async function getJacobsSpecific(crop) {
    const { data } = await axios.get("https://dawjaw.net/jacobs")
    for (jEvent of data) {
        let currentTime = Date.now();
        let eventTime = jEvent['time'] * 1000;
        if (currentTime < eventTime && jEvent['crops'].includes(crop)) {
            let delta = eventTime - currentTime;
            let timeUntilJacobEvent = convertSecondsToHoursMinutesAndSeconds(delta);
            let eventString = [];
            jEvent['crops'].forEach((crop) => {
                eventString.push(crop);
            });
            const index = crop.indexOf(crop);
            if (index > -1) {
                crop.splice(index, 1);
            }
            let contest = `The next ${crop} contest is in ${timeUntilJacobEvent} and also has ${eventString.toString().replaceAll(",",", ")}`
            return contest
        }
    }
}
class JacobCommand extends MinecraftCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'contest'

        this.description = "Says users stats"
    }

    async onCommand(username, message) {
        let args = message.split(" ")
        if(args[1] != undefined){
            let crop = args[1]
            if(crop.toLowerCase() == "cocoa"){
                crop = "Cocoa Beans"
            }
            else if(crop.toLowerCase() == "wart"){
                crop = "Nether Wart"
            }
            else if(crop.toLowerCase() == "cane"){
                crop = "Sugar Cane"
            }
            else{
                crop = await capitalizeFirstLetter(crop)
            }
            getJacobsSpecific(crop).then(contest => {
                this.minecraft.broadcastCommandEmbed2({ message: contest,
                })
                this.send(`/gc ${contest}`)
            })
        }
        else{
            getJacobs().then(contest => {
                this.minecraft.broadcastCommandEmbed2({ message: contest.replaceAll(", ","\n- ").replaceAll("Crops:","**Crops:**").replaceAll("The next contest starts in:","**The next contest starts in:**\n"),
                })
                this.send(`/gc ${contest.replaceAll("\n- ","").replaceAll("\n\n"," ┃ ").replaceAll("- ","")}`)
            })
        }
    }
}

module.exports = JacobCommand
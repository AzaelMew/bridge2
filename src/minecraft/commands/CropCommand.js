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
function capitalizeFirstLetter(string) {
    console.log(string.charAt(0).toUpperCase() + string.slice(1))
    return string.charAt(0).toUpperCase() + string.slice(1);
}
async function getJacobs(crop) {
    const { data } = await axios.get("https://dawjaw.net/jacobs")
    for (jEvent of data) {
        let currentTime = Date.now();
        let eventTime = jEvent['time'] * 1000;
        console.log(crop)
        if (currentTime < eventTime && jEvent['crops'].includes(crop)) {
            let delta = eventTime - currentTime;
            let timeUntilJacobEvent = convertSecondsToMinutesAndSeconds(delta);
            let eventString = [];
            jEvent['crops'].forEach((crop) => {
                eventString.push(crop);
            });
            let contest = `The next contest with ${crop} is in ${timeUntilJacobEvent}`
            return contest
        }
    }
}
class CropCommand extends MinecraftCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'crop'

        this.description = "Says users stats"
    }

    async onCommand(username, message) {
        let args = message.split(" ")
        let crop = args[1]
        if(crop.toLowerCase() == "cocoa"){
            crop = "Cocoa Bean"
            getJacobs(crop).then(contest => {
                this.send(`/gc ${contest}`)
            })
        }
        else if(crop.toLowerCase() == "wart"){
            crop = "Nether Wart"
            getJacobs(crop).then(contest => {
                this.send(`/gc ${contest}`)
            })
        }
        else if(crop.toLowerCase() == "cane"){
            crop = "Sugar Cane"
            getJacobs(crop).then(contest => {
                this.send(`/gc ${contest}`)
            })
        }
        else{
            capitalizeFirstLetter(crop).then(a =>{
                getJacobs(a).then(contest => {
                    this.send(`/gc ${contest}`)
                })
            })
        }

    }
}

module.exports = CropCommand
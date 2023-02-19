// Step 3: Use Node.js fs module to write the JSON string to a file on your system
const fs = require('fs');
const axios = require("axios");
let array = ["Xephor_EX","Azael_Nyaa","Vallekoen"]
const MinecraftCommand = require('../../contracts/MinecraftCommand')
async function getUUIDFromUsername(username) {
    if (!(/^[a-zA-Z0-9_]{2,16}$/mg.test(username))) {
        return "Error"
    }
    else {
        const { data } = await axios.get('https://api.mojang.com/users/profiles/minecraft/' + username)
        let uuid = data.id
        let user = username
        return data.id
    }
}
class BlacklistCommand extends MinecraftCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'blacklist'

        this.description = 'Gives needed welcome info'
    }

    async onCommand(username, message) {
        console.log(`"${username}"`)
        if(!array.includes(username)){
            console.log(array)
            console.log("hello")
            return
        }
        let args = message.split(" ")
        getUUIDFromUsername(args[2]).then(uuid => {
            let blacklist = fs.readFileSync('/home/azael/bridge/blacklist.txt', 'utf-8');
            let blacklistedIDs = blacklist.trim().split('\n');
            if (args[1] == "add") {
                if (!blacklist.includes(uuid)) {
                    this.send(`/gc ${args[2]} ${uuid} added to blacklist.`)
                    blacklist += uuid + "\n";

                    // write the updated blacklist back to the file
                    fs.writeFileSync('/home/azael/bridge/blacklist.txt', blacklist, 'utf-8');


                }
            }
            else if (args[1] == "remove") {
                this.send(`/gc ${args[2]} ${uuid} removed from blacklist.`)
                const index = blacklistedIDs.indexOf(uuid);
                if (index > -1) {
                    blacklistedIDs.splice(index, 1);

                    // write the updated blacklist back to the file
                    blacklist = blacklistedIDs.join('\n') + '\n';
                    fs.writeFileSync('blacklist.txt', blacklist, 'utf-8');
                }
            }
        })
    }
}

module.exports = BlacklistCommand
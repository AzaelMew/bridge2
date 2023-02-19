// Step 3: Use Node.js fs module to write the JSON string to a file on your system
const fs = require('fs');
const axios = require("axios");

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
        let args = message.split(" ")
        getUUIDFromUsername(args[1]).then(uuid => {
            console.log(args[1])

            let blacklist = fs.readFileSync('/home/azael/bridge/blacklist.txt', 'utf-8');

            // add the new ID to the blacklist (if it's not already there)
            if (!blacklist.includes(uuid)) {
                blacklist += uuid + "\n";

                // write the updated blacklist back to the file
                fs.writeFileSync('/home/azael/bridge/blacklist.txt', blacklist, 'utf-8');
            }
        })
    }
}

module.exports = BlacklistCommand
// Step 3: Use Node.js fs module to write the JSON string to a file on your system
const fs = require('fs');
const axios = require("axios");
const DiscordCommand = require('../../contracts/DiscordCommand')
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
class BlacklistCommand extends DiscordCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'blacklist'

        this.description = 'Gives needed welcome info'
    }

    onCommand(message) {
        if(message.channel.id != "1074902281130086410") return
        let args = this.getArgs(message)
        console.log(args[0])
        let user = args.shift()
        getUUIDFromUsername(args[1]).then(uuid => {
            let blacklist = fs.readFileSync('/home/azael/bridge/blacklist.txt', 'utf-8');
            let blacklistedIDs = blacklist.trim().split('\n');
            console.log(args[1])
            if (args[0] == "add") {
                if (!blacklist.includes(uuid)) {
                    console.log("if",uuid)
                    this.send(`/oc ${args[1]} ${uuid} added to blacklist.`)
                    blacklist += uuid + "\n";

                    // write the updated blacklist back to the file
                    fs.writeFileSync('/home/azael/bridge/blacklist.txt', blacklist, 'utf-8');
                }
                else{
                    console.log("else",uuid)
                    this.send(`/oc ${args[1]} is already in the blacklist.`)
                }
            }
            else if (args[1] == "remove") {
                this.send(`/oc ${args[1]} ${uuid} removed from blacklist.`)
                const index = blacklistedIDs.indexOf(uuid);
                if (index > -1) {
                    blacklistedIDs.splice(index, 1);

                    // write the updated blacklist back to the file
                    blacklist = blacklistedIDs.join('\n') + '\n';
                    fs.writeFileSync('blacklist.txt', blacklist, 'utf-8');
                }
            }
            else if (args[1] == "check"){
                if (!blacklist.includes(uuid)){
                    this.send(`/oc ${args[1]} is not in the blacklist.`)
                }
                else{
                    this.send(`/oc ${args[1]} is blacklisted.`)
                }
            }

        })
    }
}

module.exports = BlacklistCommand
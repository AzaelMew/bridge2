// Step 3: Use Node.js fs module to write the JSON string to a file on your system
const fs = require('fs');

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
        getUUIDFromUsername(args[0]).then(uuid => {
            console.log(args[0])
            fs.readFile('/home/azael/bridge/blacklist.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Parse existing data into an array (if it's not empty)
                const existingData = data.trim() ? data.split('\n') : [];

                // Add new string to the existing array
                existingData.push(uuid);

                // Convert updated data back to a string
                const updatedData = existingData.join('\n');

                // Write updated data back to file
                fs.writeFile('/home/azael/bridge/blacklist.txt', updatedData, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Data added to file successfully!');
                });
            });
        })
    }
}

module.exports = BlacklistCommand
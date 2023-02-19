// Define new data to be added to the file
const newString = "uuid"
// Step 3: Use Node.js fs module to write the JSON string to a file on your system
const fs = require('fs');

const MinecraftCommand = require('../../contracts/MinecraftCommand')

class TestCommand extends MinecraftCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'test'

        this.description = 'Gives needed welcome info'
    }

    onCommand() {

        fs.readFile('/home/azael/bridge/blacklist.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // Parse existing data into an array (if it's not empty)
            const existingData = data.trim() ? data.split('\n') : [];

            // Add new string to the existing array
            existingData.push(newString);

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
        function readFileToArray(filename, callback) {
            // Read file contents
            fs.readFile(filename, 'utf8', (err, data) => {
              if (err) {
                callback(err);
                return;
              }
          
              // Parse file contents into an array of strings
              const dataArray = data.trim() ? data.split('\n') : [];
          
              // Return array of strings
              callback(null, dataArray);
            });
          }
          
          // Example usage:
          readFileToArray('/home/azael/bridge/blacklist.txt', (err, dataArray) => {
            if (err) {
              console.error(err);
              return;
            }
          
            console.log('Array contents:', dataArray);
          });

    }
}

module.exports = TestCommand
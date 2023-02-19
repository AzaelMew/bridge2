// Define new data to be added to the file
const newData = {
    name: 'Jane Doe',
    age: 25,
    email: 'jane.doe@example.com'
  };
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

    fs.readFile('/home/azael/bridge/blacklist.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data)
        // Parse existing data from JSON format
        const existingData = JSON.parse(data);
      
        // Merge existing data with new data
        const mergedData = Object.assign({}, existingData, newData);
      
        // Convert merged data to JSON format
        const jsonData = JSON.stringify(mergedData);
      
        // Write merged data back to file
        fs.writeFile('/home/azael/bridge/blacklist.json', jsonData, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Data added to file successfully!');
        });
      });
    
  }
}

module.exports = TestCommand
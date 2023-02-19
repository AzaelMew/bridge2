// Step 1: Create a JavaScript object with the data you want to write to the file
let myData = {
    name: "John",
    age: 30,
    city: "New York"
};

// Step 2: Convert the JavaScript object to a JSON string using JSON.stringify() method
let jsonString = JSON.stringify(myData);

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
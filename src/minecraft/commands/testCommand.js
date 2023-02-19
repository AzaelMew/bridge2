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

    fs.writeFile('/home/azael/bridge/blacklist.json', jsonString, 'utf8', function (err) {
        if (err) {
            console.log("Error writing file:", err);
        } else {
            console.log("File successfully written!");
        }
    });
    
  }
}

module.exports = TestCommand
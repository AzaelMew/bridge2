const MinecraftCommand = require('../../contracts/MinecraftCommand')

class GHCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'farmhelper'
    this.aliases = ["fh"]
    this.description = 'Gives needed welcome info'
  }

  onCommand(username, message) {
    let args = message.toLowerCase().split(" ")
    if(args[1]== "cocoa"){
        this.send(`/gc 150 speed w/o Sprint | 55° Angle Pitch`)
    }
    else if(args[1]== "cane"){
        this.send(`/gc 327 Speed | 135° or 45° Angle Yaw`)
    }
    else if(args[1]== "potato"){
        this.send(`/gc Normal: 360 w/ Sprint or 400 w/o Sprint | Angle doesn't matter`)
    }
    else if(args[1]== "carrot"){
        this.send(`/gc Normal: 360 w/ Sprint or 400 w/o Sprint | Angle doesn't matter`)
    }
    else if(args[1]== "wart"){
        this.send(`/gc Normal: 360 w/ Sprint or 400 w/o Sprint | Angle doesn't matter`)
    }
    else if(args[1]== "wheat"){
        this.send(`/gc Normal: 360 w/ Sprint or 400 w/o Sprint | Angle doesn't matter`)
    }
    else if(args[1]== "pumpkin"){
        this.send(`/gc Normal: 380 Speed | 145° or 35° Angle Yaw`)

    }
    else if(args[1]== "melon"){
        this.send(`/gc Normal: 380 Speed | 145° or 35° Angle Yaw`)

    }
    else if(args[1]== "cactus"){
        this.send(`/gc 400 Speed | 90° Angle Yaw`)

    }
    else{
        setTimeout(() => {
            this.send(`/gc Cocoa, Cane, Potato, Carrot, Wheat, Pumpkin, Melon, Cactus, Wart`)
        }, 500);
        this.send(`/gc Specify which crop you want to know about. The options are:`)

        }
    }
}

module.exports = GHCommand

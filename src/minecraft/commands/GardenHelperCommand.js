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
        this.send(`/gc 160 Speed | 60-65° Angle Pitch`)
    }
    if(args[1]== "cane"){
        this.send(`/gc 327 Speed | 135° or 45° Angle Yaw`)
    }
    if(args[1]== "potato"){
        this.send(`/gc Normal: 400 Speed | Ange Angle Yaw, Semi AFK: 116 Speed | 90° Angle Yaw, Visit Azael_Nyaa for normal design and Xephor_EX for Semi-AFK`)
    }
    if(args[1]== "carrot"){
        this.send(`/gc Normal: 400 Speed | Ange Angle Yaw, Semi AFK: 116 Speed | 90° Angle Yaw, Visit Azael_Nyaa for normal design and Xephor_EX for Semi-AFK`)

    }
    if(args[1]== "wheat"){
        this.send(`/gc Normal: 400 Speed | Ange Angle Yaw, Semi AFK: 116 Speed | 90° Angle Yaw, Visit Azael_Nyaa for normal design and Xephor_EX for Semi-AFK`)


    }
    if(args[1]== "pumpkin"){
        this.send(`/gc Normal: 380 Speed | 135° or 45° Angle Yaw, Semi AFK: 327 Speed | 135° or 45° Angle Yaw, Visit Azael_Nyaa for normal design and Xephor_EX for Semi-AFK`)

    }
    if(args[1]== "melon"){
        this.send(`/gc Normal: 380 Speed | 135° or 45° Angle Yaw, Semi AFK: 327 Speed | 135° or 45° Angle Yaw, Visit Azael_Nyaa for normal design and Xephor_EX for Semi-AFK`)

    }
    if(args[1]== "cactus"){
        this.send(`/gc 400 Speed | 90° Angle Yaw`)

    }
    else{
        setTimeout(() => {
            this.send(`/gc Cocoa, Cane, Potato, Carrot, Wheat, Pumpkin, Melon, Cactus`)

        }, 500);
        this.send(`/gc Specify which crop you want to know about. The options are:`)

        }
    }
}

module.exports = GHCommand

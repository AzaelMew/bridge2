const Configuration = require('./Configuration')
const DiscordManager = require('./discord/DiscordManager')
const MinecraftManager = require('./minecraft/MinecraftManager')
const ExpressManager = require('./express/ExpressManager')
const Logger = require('./Logger')
require('dotenv').config();

class Application {
  async register() {
    this.config = new Configuration()
    this.log = new Logger()

    this.discord = new DiscordManager(this)
    this.minecraft = new MinecraftManager(this)
    this.express = new ExpressManager(this)

    this.discord.setBridge(this.minecraft)
    this.minecraft.setBridge(this.discord)
  }

  async connect() {
    this.discord.connect()
    this.minecraft.connect()
    this.express.initialize()
  }
}

module.exports = new Application()

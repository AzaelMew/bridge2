class MessageHandler {
  constructor(discord, command) {
    this.discord = discord
    this.command = command
  }

  async onMessage(message) {
    if(message.content.toLowerCase().includes("ez")){
      if(message.content.includes("ez")){
        message.content = message.content.replace("ez","e z")
      }
      else if(message.content.includes("Ez")){
        message.content = message.content.replace("Ez","E z")
      }
      else if(message.content.includes("eZ")){
        message.content = message.content.replace("eZ","e Z")
      }
      else if(message.content.includes("EZ")){
        message.content = message.content.replace("EZ","E Z")
      }
    }


    if (!this.shouldBroadcastMessage(message)) {
      return
    }

    if (this.command.handle(message)) {
      return
    }

    const content = this.stripDiscordContent(message.content).trim()
    if (content.length == 0) {
      return
    }
    if (this.shouldBroadcastOfficerMessage(message)) {
      this.discord.broadcastOfficerMessage({
        username: message.member.displayName,
        message: this.stripDiscordContent(message.content),
        replyingTo: await this.fetchReply(message),
      })
    }
    this.discord.broadcastMessage({
      username: message.member.displayName,
      message: this.stripDiscordContent(message.content),
      replyingTo: await this.fetchReply(message),
    })
  }

  async fetchReply(message) {
    try {
      if (!message.reference) return null

      const reference = await message.channel.messages.fetch(message.reference.messageID)

      return reference.member ? reference.member.displayName : reference.author.username
    } catch (e) {
      return null
    }
  }

  stripDiscordContent(message) {
    return message
      .replace(/<[@|#|!|&]{1,2}(\d+){16,}>/g, '\n')
      .replace(/<:\w+:(\d+){16,}>/g, '\n')
      .replace(/<.*:\d{16,20}>/g,"\n")
      .split('\n')
      .map(part => {
        part = part.trim()

        return part.length == 0 ? '' : part + ' '
      })
      .join('')
  }

  shouldBroadcastMessage(message) {
    return !message.author.bot && message.channel.id == this.discord.app.config.discord.channel && message.content && message.content.length > 0
  }
  shouldBroadcastOfficerMessage(message){
    return !message.author.bot && message.channel.id == this.discord.app.config.discord.officer && message.content && message.content.length > 0
  }
}

module.exports = MessageHandler

const DiscordCommand = require('../../contracts/DiscordCommand')
const axios = require("axios");
const nbt = require('prismarine-nbt');
const Canvas = require('canvas');
const imgur = require('imgur-anonymous-uploader');
const { url } = require('inspector');
const util = require('util');
const uploader = new imgur("318214bc4f4717f");

Canvas.registerFont('./src/fonts/MinecraftRegular-Bmg3.ttf', { family: 'Minecraft' });
Canvas.registerFont('./src/fonts/minecraft-bold.otf', { family: 'MinecraftBold' });
Canvas.registerFont('./src/fonts/2_Minecraft-Italic.otf', { family: 'MinecraftItalic' });
Canvas.registerFont('./src/fonts/unifont.ttf', { family: 'MinecraftUnicode' });
const RGBA_COLOR = {
    0: 'rgba(0,0,0,1)',
    1: 'rgba(0,0,170,1)',
    2: 'rgba(0,170,0,1)',
    3: 'rgba(0,170,170,1)',
    4: 'rgba(170,0,0,1)',
    5: 'rgba(170,0,170,1)',
    6: 'rgba(255,170,0,1)',
    7: 'rgba(170,170,170,1)',
    8: 'rgba(85,85,85,1)',
    9: 'rgba(85,85,255,1)',
    a: 'rgba(85,255,85,1)',
    b: 'rgba(85,255,255,1)',
    c: 'rgba(255,85,85,1)',
    d: 'rgba(255,85,255,1)',
    e: 'rgba(255,255,85,1)',
    f: 'rgba(255,255,255,1)',
};

async function getCanvasWidthAndHeight(lore) {
    const canvas = Canvas.createCanvas(1, 1);
    const ctx = canvas.getContext('2d');
    ctx.font = '24px Minecraft';

    let highestWidth = 0;
    for (let i = 0; i < lore.length; i++) {
        const width = ctx.measureText(lore[i].replace(/\u00A7[0-9A-FK-OR]/gi, '')).width;
        if (width > highestWidth) {
            highestWidth = width;
        }
    }

    return { height: lore.length * 24 + 15, width: highestWidth + 60 };
}

async function renderLore(itemName, lore) {
    if (itemName) lore.unshift(itemName);
    const measurements = await getCanvasWidthAndHeight(lore);
    const canvas = Canvas.createCanvas(measurements.width, measurements.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#100110';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowColor = '#131313';
    ctx.font = '24px Minecraft';
    ctx.fillStyle = '#ffffff';

    for (const [index, item] of Object.entries(lore)) {
        let width = 10;
        const splitItem = item.split('§');
        if (splitItem[0].length == 0) splitItem.shift();

        for (const toRenderItem of splitItem) {
            ctx.fillStyle = RGBA_COLOR[toRenderItem[0]];

            if (toRenderItem.startsWith('l')) ctx.font = '24px MinecraftBold, MinecraftUnicode';
            else if (toRenderItem.startsWith('o')) ctx.font = '24px MinecraftItalic, MinecraftUnicode';
            else ctx.font = '24px Minecraft, MinecraftUnicode';

            ctx.fillText(toRenderItem.substring(1), width, index * 24 + 29);
            width += ctx.measureText(toRenderItem.substring(1)).width;
        }
    }

    return canvas.toBuffer();
}

async function getLastProfile(data) {
    console.log(data)
    const profiles = data.profiles;
    return profiles.sort((a, b) => b.selected - a.selected)[0];
}
const parseNbt = util.promisify(nbt.parse);
async function nameToUUID(name) {
    try {
        return (await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`)).data.id;
    } catch (e) {
        return null;
    }
}
async function decodeData(buffer) {
    const parsedNbt = await parseNbt(buffer);
    return nbt.simplify(parsedNbt);
}
function isValidUsername(username) {
    if (username.match(/^[0-9a-zA-Z_]+$/)) {
        return true;
    } else {
        return false;
    }
}
async function getPlayer(player, profile) {
    if (typeof player !== 'string' || !isValidUsername(player)) {
        throw new Error('Invalid Username');
    }

    const mojangResponse = await nameToUUID(player);
    if (!mojangResponse) throw new Error('Player not found');

    const hypixelResponse = await axios.get(`https://api.hypixel.net/skyblock/profiles?uuid=${mojangResponse}&key=4fd2ea22-23ec-4543-9141-01288a80adfb`);
    if (!hypixelResponse) throw new Error("Couldn't get a response from the API");
    if (hypixelResponse.profiles === null) throw new Error(`Couldn\'t find any Skyblock profile that belongs to ${player}`);
    let profileData = await getLastProfile(hypixelResponse);
    
    if (profile) {
        profileData = hypixelResponse.data.profiles.find((p) => p.cute_name.toLowerCase() === profile.toLowerCase()) || getLastProfile(hypixelResponse.data);
    }
    if (!profileData) throw new Error(`Couldn't find the specified Skyblock profile that belongs to ${player}.`);
    return { memberData: profileData.members[mojangResponse], profileData, profiles: hypixelResponse.profiles };
}
async function getData(message) {
    let { 1: username, 2: profile, 3: itemNumber } = message.split(' ');
    if (!isNaN(Number(profile))) {
        itemNumber = profile;
    }
    if (!isNaN(Number(username))) {
        itemNumber = username;
    }
    if (itemNumber < 1 || itemNumber > 9 || !itemNumber)
        return "Invalid item number. Must be between 1 and 9."

    const searchedPlayer = await getPlayer(username, profile).catch((err) => {
        return err
    });
    const playerProfile = searchedPlayer.memberData;
    const inventory = playerProfile?.inv_contents?.data;
    if (!inventory) {
        return " has no items in their inventory or has their inventory API disabled."
    }

    const inventoryData = (await decodeData(Buffer.from(inventory, 'base64'))).i;
    const selectedItem = inventoryData[itemNumber - 1];
    if (!selectedItem || !Object.keys(selectedItem || {}).length) {
        return minecraftClient.chat(`This player does not have an item in slot ${itemNumber}.`);
    }

    const renderedItem = await renderLore(selectedItem?.tag?.display?.Name, selectedItem?.tag?.display?.Lore);

    const uploadResponse = await uploader.uploadBuffer(renderedItem);
    if (!uploadResponse.url) return minecraftClient.chat(`Failed to upload image.`);
    console.log(uploadResponse.url)
    return `${username}awssaw${uploadResponse.url}`
}
class RenderCommand extends DiscordCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'render'
        this.description = 'renders specified slot'
    }

    onCommand(message) {
        getData(message.content).then(returnurl => {
            returnurl.split("awssaw")
            let username = returnurl[0]
            returnurl = returnurl[1]/*
            this.sendMinecraftMessage(`/gc ${username}: ${returnurl}`)
            this.minecraft.broadcastNewImage({ username: username, image: `${returnurl}`, icon: 'https://www.mc-heads.net/avatar/' + username })
        */})
    }
}

module.exports = RenderCommand

module.exports.config = {
    name: "welcomenoti",
    version: "1.0.0",
    role: 3,
    credits: "chill",
    description: "Automatically welcome",
    hasPrefix: true,
    aliases: ["wcnoti"],
    usage: "[welcomenoti] <on|off> [groupname] [groupicon] [background]",
    cooldown: 5
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

let welcomeSettings = {};

module.exports.run = async function({ api, event, args }) {
    const command = args[0];
    const threadID = event.threadID;

    if (command === "on") {
        if (args.length < 4) {
            return api.sendMessage("Usage: welcomenoti on <groupname> <groupicon> <background>", threadID);
        }
        
        const groupname = args[1];
        const groupicon = args[2];
        const background = args[3];
        
        welcomeSettings[threadID] = {
            enabled: true,
            groupname,
            groupicon,
            background
        };

        api.sendMessage("Welcome notifications have been enabled.", threadID);
    } else if (command === "off") {
        if (welcomeSettings[threadID]) {
            welcomeSettings[threadID].enabled = false;
        }
        api.sendMessage("Welcome notifications have been disabled.", threadID);
    } else {
        api.sendMessage("Invalid command. Use 'welcomenoti on' to enable or 'welcomenoti off' to disable.", threadID);
    }
};

module.exports.handleEvent = async function({ api, event }) {
    const threadID = event.threadID;
    const settings = welcomeSettings[threadID];

    if (event.logMessageType === "log:subscribe" && settings && settings.enabled) {
        const addedParticipants = event.logMessageData.addedParticipants;
        addedParticipants.forEach(async (participant) => {
            const name = participant.fullName;
            const groupname = settings.groupname;
            const groupicon = settings.groupicon;
            const memberCount = event.participantIDs.length;
            const uid = participant.userFbId;
            const background = settings.background;

            const apiUrl = `https://ggwp-yyxy.onrender.com/canvas/welcome?name=${encodeURIComponent(name)}&groupname=${encodeURIComponent(groupname)}&groupicon=${encodeURIComponent(groupicon)}&member=${memberCount}&uid=${uid}&background=${encodeURIComponent(background)}`;
            
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            const welcomePhotoPath = path.join(__dirname, "welcome.jpg");

            fs.writeFileSync(welcomePhotoPath, response.data);

            api.sendMessage({
                body: `Welcome ${name} to ${groupname}!`,
                attachment: fs.createReadStream(welcomePhotoPath)
            }, threadID, () => {
                fs.unlinkSync(welcomePhotoPath);
            });
        });
    }
};

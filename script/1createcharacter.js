const axios = require("axios");

module.exports.config = {
    name: "createchar",
    version: "1.0.0",
    role: 0,
    credits: "Developer",
    description: "Create an AI character",
    hasPrefix: false,
    aliases: ["crc", "ctc"],
    usage: "createchar (any character name)",
    cooldown: 5

};

module.exports.run = async function({ api, event, args }) {

    try {
        const name = args.join(" ");
        const defaultPrompt = "Greetings! I am the new AI character created by you.";  
        if (!name) {

            return api.sendMessage("How to use: ", event.threadID);

        }

        const uid = event.senderID; 
        const apiUrl = `https://joshweb.click/cai/create?name=${encodeURIComponent(name)}&prompt=${encodeURIComponent(defaultPrompt)}&uid=${uid}`;
        api.sendMessage("Creating character, wait for a moment..", event.threadID);
        const response = await axios.get(apiUrl);
        const result = response.data;
        if (result.status) {
            api.sendMessage(`Successfully created a new AI character: ${name}`, event.threadID);

        } else {
            api.sendMessage("Failed to create the AI character.", event.threadID);
        }

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage("An error occurred while processing the request.", event.threadID);
    }

};

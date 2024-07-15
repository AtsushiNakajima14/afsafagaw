const axios = require("axios");

module.exports.config = {
    name: "chatchar",
    version: "1.0.0",
    role: 0,
    credits: "Developer",
    description: "Chat with the AI Character you created.",
    hasPrefix: false,
    aliases: ["cai", "cc"],
    usage: "chatchar (the AI you created) (query)",
    cooldown: 5
};

module.exports.run = async function({ api, event, args }) {

    try {
        if (args.length < 2) {
            return api.sendMessage("How to use: cc (AI Char you created) (query) ", event.threadID);
        }

        const character = args.shift();
        const query = args.join(" ");
        const uid = event.senderID;  
        const apiUrl = `https://joshweb.click/cai/chat?q=${encodeURIComponent(query)}&character=${encodeURIComponent(character)}&uid=${uid}`;
        api.sendMessage("Processing query..", event.threadID);
        const response = await axios.get(apiUrl);
        const result = response.data;
        if (result.status) {
            api.sendMessage(result.result, event.threadID);

        } else {
            api.sendMessage("Failed to get a response from the AI character.", event.threadID);
        }

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage("An error occurred while processing the request.", event.threadID);
    }
};

const axios = require('axios');

module.exports.config = {
    name: "analyser",
    role: 0,
    credits: "Developer",
    description: "Interact with Gemini",
    hasPrefix: true,
    version: "1.0.0",
    aliases: ["imageai"],
    usage: "gemini [reply to photo]"
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage('This command is only for images.', event.threadID, event.messageID);
    }

    if (event.type !== "message_reply" || !event.messageReply.attachments[0] || event.messageReply.attachments[0].type !== "photo") {
        return api.sendMessage('Please reply to a photo with this command.', event.threadID, event.messageID);
    }

    const url = encodeURIComponent(event.messageReply.attachments[0].url);
    api.sendTypingIndicator(event.threadID);

    try {
        await api.sendMessage('\n━━━━━━━━━━━━━━━━━━\nrecognizing picture, please wait...\n━━━━━━━━━━━━━━━━━━', event.threadID);

        const response = await axios.get(`https://deku-rest-api.gleeze.com/gemini?prompt=${encodeURIComponent(prompt)}&url=${url}`);
        const description = response.data.gemini;

        return api.sendMessage(`IMAGE ANALYZER AI\n━━━━━━━━━━━━━━━━━━\n${description}\n━━━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
};

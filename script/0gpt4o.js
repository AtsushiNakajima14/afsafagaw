const hiro = require('hiroshi-ai');

module.exports.config = {
    name: "gpt4o",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kim Joseph DG Bien",
    hasPrefix: true,
    description: "GPT-4o model with Conversational.",
    commandCategory: "AI",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    if (args.length === 0) {
        return api.sendMessage("Usage: /gpt4o <text>", event.threadID, event.messageID);
    }

    const text = args.join(" ");
    const loadingMsg = `⟳ | Finding Result For "${text}" ...`;
    api.sendMessage(loadingMsg, event.threadID, event.messageID);

    try {
        const response = await hiro.gpt4o({ ask: text, id: event.senderID });

        if (response && response.response) {
            const msg = response.response;
            api.sendMessage(msg, event.threadID, event.messageID);
        } else {
            api.sendMessage("error", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error fetching data from API:', error);
        api.sendMessage("An error occurred while fetching data from GPT-4o.", event.threadID, event.messageID);
    }
};

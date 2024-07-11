const axios = require("axios");

module.exports.config = {
    name: "gemini",
    version: "1.0.0",
    credits: "Developer",
    description: "Get answers from Gemini",
    hasPrefix: false,
    cooldown: 5,
    aliases: ['bard']
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("Provide a question to answer..", event.threadID, event.messageID);
        }

        api.sendMessage("Processing query...", event.threadID, async (err, info) => {
            try {
                const response = await axios.get(`https://joshweb.click/new/gemini?prompt=${encodeURIComponent(q)}`);
                const answer = response.data.result;

                api.sendMessage(answer, event.threadID);
            } catch (error) {
                console.error(error);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (error) {
        console.error("Error in ai command:", error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};

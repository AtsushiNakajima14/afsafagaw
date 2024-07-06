const axios = require("axios");

module.exports.config = {
    name: "greyrat",
    version: "1.0.0",
    credits: "CyDev",
    description: "Chat with Greyrat (C.AI)",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["rudeus", "grey", "rat"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("How to use:\n\n• rudeus/greyrat [query]\n\n• rudeus/greyrat who are you?", event.threadID, event.messageID);
        }

        api.sendMessage("Processing your query...", event.threadID, async (err, info) => {
            try {
                const response = await axios.get(`https://joshweb.click/pai/rudeus?q=${encodeURIComponent(q)}&uid=100`);
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

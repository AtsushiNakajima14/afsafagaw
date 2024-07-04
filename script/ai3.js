const axios = require("axios");

module.exports.config = {
    name: "ai3",
    version: "1.0.0",
    credits: "CyDev",
    description: "Get answers from Zephyr",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["zephyr"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("How to use:\n\n• ai3/zephyr [query]\n\n• ai3/zephyr what would happen to the humanity if there is a nuclear war?", event.threadID, event.messageID);
        }

        api.sendMessage("Processing your query...", event.threadID, async (err, info) => {
            try {
                const response = await axios.get(`https://joshweb.click/ai/zephyr-7b?q={encodeURIComponent(q)}&uid=100`);
                const answer = response.data.result;

                api.sendMessage(answer, event.threadID);
            } catch (error) {
                console.error(error);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (error) {
        console.error("Error in lma command:", error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};

